import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { config } from '../netlify/functions/chat.mjs';

const req = (opts = {}) => new Request('https://zolutionsai.com/api/chat', {
  method: opts.method || 'POST',
  headers: { 'content-type': 'application/json', ...(opts.origin === null ? {} : { origin: opts.origin || 'https://zolutionsai.com' }) },
  body: opts.method === 'GET' ? undefined : (opts.body ?? JSON.stringify({ messages: [{ role: 'user', content: 'hola' }] })),
});

test('rechaza métodos distintos de POST', async () => {
  assert.equal((await handler(req({ method: 'GET' }))).status, 405);
});

test('rechaza orígenes ajenos al sitio', async () => {
  assert.equal((await handler(req({ origin: 'https://otro-sitio.com' }))).status, 403);
  assert.equal((await handler(req({ origin: null }))).status, 403);
});

test('sin clave de API responde 503 para que el chat ofrezca WhatsApp', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  const r = await handler(req());
  assert.equal(r.status, 503);
  assert.deepEqual(await r.json(), { error: 'not_configured' });
});

test('con clave, rechaza cuerpos inválidos antes de llamar a la API', async () => {
  process.env.ANTHROPIC_API_KEY = 'sk-test';
  assert.equal((await handler(req({ body: '{no json' }))).status, 400);
  assert.equal((await handler(req({ body: JSON.stringify({ messages: [{ role: 'assistant', content: 'x' }] }) }))).status, 400);
  delete process.env.ANTHROPIC_API_KEY;
});

test('ruta y límite de uso configurados', () => {
  assert.equal(config.path, '/api/chat');
  assert.ok(config.rateLimit.windowLimit > 0 && config.rateLimit.windowSize <= 180);
});
