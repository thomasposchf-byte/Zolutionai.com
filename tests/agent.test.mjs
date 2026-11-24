import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runChat, sanitizeRequest, validateToolInput, SYSTEM_PROMPT, TOOLS } from '../src/lib/agent.mjs';

// Cliente falso de Anthropic: devuelve mensajes predefinidos, ronda por ronda.
function fakeClient(rounds) {
  const calls = [];
  const messages = {
    stream(params) {
      calls.push({ ...params, viaStable: true });
      return streamFor(rounds[calls.length - 1]);
    },
  };
  const streamFor = (msg) => {
    const handlers = {};
    return {
      on(ev, fn) { handlers[ev] = fn; return this; },
      async finalMessage() {
        for (const b of msg.content) if (b.type === 'text') handlers.text?.(b.text);
        return msg;
      },
    };
  };
  return {
    calls,
    messages,
    beta: {
      messages: {
        stream(params) {
          calls.push(params);
          const msg = rounds[calls.length - 1];
          const handlers = {};
          return {
            on(ev, fn) { handlers[ev] = fn; return this; },
            async finalMessage() {
              for (const b of msg.content) if (b.type === 'text') handlers.text?.(b.text);
              return msg;
            },
          };
        },
      },
    },
  };
}

test('sanitizeRequest: agrega contexto de página y descarta el saludo inicial del asistente', () => {
  const r = sanitizeRequest({
    page: 'Precios',
    lead: true,
    messages: [
      { role: 'assistant', content: 'Hola, soy Zoe' },
      { role: 'user', content: '¿Cuánto cuesta?' },
    ],
  });
  assert.equal(r.ok, true);
  assert.equal(r.messages.length, 1);
  assert.equal(r.messages[0].role, 'user');
  assert.match(r.messages[0].content, /^\[Página actual: Precios\]\n\[Este visitante ya dejó sus datos/);
  assert.match(r.messages[0].content, /¿Cuánto cuesta\?$/);
});

test('sanitizeRequest: rechaza roles inválidos y conversaciones que no terminan en el visitante', () => {
  assert.equal(sanitizeRequest({ messages: [{ role: 'system', content: 'x' }] }).ok, false);
  assert.equal(sanitizeRequest({ messages: [{ role: 'user', content: 'a' }, { role: 'assistant', content: 'b' }] }).ok, false);
  assert.equal(sanitizeRequest({}).ok, false);
});

test('validateToolInput: exige nombre y un contacto válido', () => {
  assert.equal(validateToolInput('registrar_lead', { nombre: 'Ana', contacto: 'mañana', necesidad: 'x', interes: 'alto', resumen: 'y' }).ok, false);
  const ok = validateToolInput('registrar_lead', { nombre: ' Ana ', contacto: '+56 9 1234 5678', necesidad: 'x', interes: 'alto', resumen: 'y', servicio: 'inventado' });
  assert.equal(ok.ok, true);
  assert.equal(ok.value.nombre, 'Ana');
  assert.equal(ok.value.servicio, 'Por definir');
  assert.equal(validateToolInput('mostrar_pagina', { pagina: 'precios' }).value.path, '/precios');
  assert.equal(validateToolInput('mostrar_pagina', { pagina: 'admin' }).ok, false);
});

test('runChat: transmite texto, avisa la herramienta y sigue a la segunda ronda', async () => {
  const client = fakeClient([
    {
      stop_reason: 'tool_use',
      content: [
        { type: 'text', text: 'Perfecto, Ana.' },
        { type: 'tool_use', id: 'tu_1', name: 'registrar_lead', input: { nombre: 'Ana', contacto: 'ana@empresa.cl', necesidad: 'responder WhatsApp', interes: 'alto', resumen: 'Inmobiliaria con 200 consultas.' } },
      ],
    },
    { stop_reason: 'end_turn', content: [{ type: 'text', text: 'Un especialista te contactará pronto.' }] },
  ]);
  const events = [];
  await runChat({ client, messages: [{ role: 'user', content: 'Soy Ana, ana@empresa.cl' }], send: (e) => events.push(e) });

  assert.deepEqual(events.map((e) => e.t), ['text', 'tool', 'sep', 'text']);
  assert.equal(events[1].input.contacto, 'ana@empresa.cl');
  assert.equal(client.calls.length, 2);
  const second = client.calls[1].messages;
  assert.equal(second[1].role, 'assistant');
  assert.equal(second[2].content[0].tool_use_id, 'tu_1');
  // Petición correcta al modelo
  assert.equal(client.calls[0].model, 'claude-opus-5-5');
  assert.equal(client.calls[0].fallbacks, 'default');
  assert.equal(client.calls[0].system[0].text, SYSTEM_PROMPT);
  assert.equal(client.calls[0].tools, TOOLS);
});

test('runChat: una herramienta con datos inválidos vuelve como error al modelo y no llega al navegador', async () => {
  const client = fakeClient([
    { stop_reason: 'tool_use', content: [{ type: 'tool_use', id: 'tu_1', name: 'registrar_lead', input: { nombre: 'Ana' } }] },
    { stop_reason: 'end_turn', content: [{ type: 'text', text: '¿Me dejas tu WhatsApp?' }] },
  ]);
  const events = [];
  await runChat({ client, messages: [{ role: 'user', content: 'hola' }], send: (e) => events.push(e) });
  assert.equal(events.some((e) => e.t === 'tool'), false);
  assert.equal(client.calls[1].messages[2].content[0].is_error, true);
});

test('runChat: una negativa del modelo se informa y termina', async () => {
  const client = fakeClient([{ stop_reason: 'refusal', content: [] }]);
  const events = [];
  await runChat({ client, messages: [{ role: 'user', content: 'x' }], send: (e) => events.push(e) });
  assert.deepEqual(events, [{ t: 'refusal' }]);
});

test('runChat con Netlify AI Gateway: usa la API estable, sin cabeceras beta', async () => {
  const client = fakeClient([{ stop_reason: 'end_turn', content: [{ type: 'text', text: 'Hola' }] }]);
  await runChat({ client, messages: [{ role: 'user', content: 'hola' }], send: () => {}, direct: false });
  assert.equal(client.calls[0].viaStable, true);
  assert.equal(client.calls[0].betas, undefined);
  assert.equal(client.calls[0].fallbacks, undefined);
  assert.equal(client.calls[0].output_config.effort, 'low');
});
