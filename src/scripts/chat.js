// Agente Zoe en el navegador: conversa vía /api/chat, guarda la conversación entre páginas
// y, cuando detecta interés, registra el lead en Netlify Forms y muestra los botones para agendar o escribir.

const root = document.getElementById('zoe-root');
if (root) init(root);

function init(root) {
  const $ = (id) => document.getElementById(id);
  const zoe = $('zoe'), launch = $('zoeLaunch'), log = $('zoeLog'), txt = $('zoeText'), sendBtn = $('zoeSend'), chips = $('zoeChips');
  const nudge = $('zoeNudge');
  const PAGE = root.dataset.page || document.title;
  const CAL = root.dataset.cal, WA = root.dataset.wa, WA_SHOWN = root.dataset.waShown;
  const KEY = 'zoe:v1';
  const GREETING = 'Hola, soy Zoe, la agente de IA de Zolutions. Te respondo al instante sobre nuestros agentes, automatizaciones, precios y cómo partir. ¿Qué te gustaría mejorar en tu empresa?';
  const track = (name, params) => { try { window.zTrack?.(name, params); } catch { /* sin analítica */ } };

  // ---------- Estado (sobrevive al cambiar de página en la misma pestaña) ----------
  let state = { open: false, turns: [], shown: [], lead: null, nudged: false };
  try { const s = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (s && Array.isArray(s.turns)) state = { ...state, ...s }; } catch { /* almacenamiento no disponible */ }
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* sin almacenamiento */ } };

  let busy = false, ctl = null, handoffEl = null;

  // ---------- Texto enriquecido seguro ----------
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const inline = (s) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  function rich(text) {
    const lines = esc(String(text).trim()).split('\n');
    let html = '', inList = false;
    for (const ln of lines) {
      const m = ln.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)/);
      if (m) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${inline(m[1])}</li>`; }
      else { if (inList) { html += '</ul>'; inList = false; } if (ln.trim()) html += `<p>${inline(ln)}</p>`; }
    }
    return inList ? `${html}</ul>` : html;
  }

  const scrollLog = () => { log.scrollTop = log.scrollHeight; };
  function bubble(who, text, cls = '') {
    const el = document.createElement('div');
    el.className = `b ${who === 'me' ? 'me' : 'bot'}${cls ? ` ${cls}` : ''}`;
    if (who === 'me') el.textContent = text; else el.innerHTML = rich(text);
    log.appendChild(el); scrollLog();
    return el;
  }

  function renderAll() {
    log.innerHTML = '';
    bubble('bot', GREETING);
    for (const m of state.shown) bubble(m.r === 'v' ? 'me' : 'bot', m.t);
    if (state.lead) renderHandoff(state.lead);
    refreshChips();
  }
  function refreshChips() { chips.hidden = state.shown.some((m) => m.r === 'v'); }

  // ---------- Abrir / cerrar ----------
  function openChat(prefill) {
    zoe.hidden = false; launch.hidden = true; launch.setAttribute('aria-expanded', 'true');
    if (nudge) nudge.hidden = true;
    if (!state.open) track('chat_open', { page: PAGE });
    state.open = true; state.nudged = true; save();
    if (!log.children.length) renderAll();
    if (typeof prefill === 'string' && prefill) { txt.value = prefill; autoGrow(); }
    setTimeout(() => txt.focus(), 30);
  }
  function closeChat() {
    zoe.hidden = true; launch.hidden = false; launch.setAttribute('aria-expanded', 'false');
    state.open = false; save();
  }
  launch.addEventListener('click', () => openChat());
  $('zoeClose').addEventListener('click', closeChat);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open-chat]');
    if (b) { e.preventDefault(); openChat(b.dataset.openChat); }
    const c = e.target.closest('[data-chip]');
    if (c) send(c.dataset.chip);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !zoe.hidden) closeChat(); });

  // Burbuja proactiva: texto fijo, sin costo; una vez por sesión.
  if (nudge && !state.nudged && !state.open) {
    setTimeout(() => { if (zoe.hidden && !state.nudged) nudge.hidden = false; }, 9000);
    nudge.addEventListener('click', (e) => {
      state.nudged = true; save(); nudge.hidden = true;
      if (!e.target.closest('#nudgeX')) openChat();
    });
    nudge.addEventListener('keydown', (e) => { if (e.key === 'Enter') openChat(); });
  }

  // ---------- Enviar mensaje ----------
  function autoGrow() { txt.style.height = 'auto'; txt.style.height = `${Math.min(txt.scrollHeight, 120)}px`; }
  txt.addEventListener('input', autoGrow);
  txt.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('zoeForm').requestSubmit(); } });
  $('zoeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy) { ctl?.abort(); return; }
    const v = txt.value; txt.value = ''; autoGrow();
    send(v);
  });
  function setBusy(on) {
    busy = on;
    sendBtn.classList.toggle('stop', on);
    sendBtn.setAttribute('aria-label', on ? 'Detener' : 'Enviar');
    sendBtn.innerHTML = on
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="6" y="6" width="8" height="8" rx="1.5" fill="currentColor"/></svg>'
      : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  const FALLBACK = `En este momento no puedo responder. Escríbenos por WhatsApp al **${WA_SHOWN}** o usa **Hablar con una persona** y te contactamos.`;
  const ERRORS = {
    busy: 'Estoy recibiendo muchas consultas. Intenta de nuevo en un minuto o usa **Hablar con una persona**.',
    refusal: 'Prefiero no responder eso. ¿Te ayudo con algo sobre nuestras soluciones?',
    upstream: 'Se cortó la conexión. Envía tu mensaje de nuevo.',
  };

  async function send(raw) {
    const text = String(raw || '').trim().slice(0, 1500);
    if (!text || busy) return;
    if (zoe.hidden) openChat();
    bubble('me', text);
    state.shown.push({ r: 'v', t: text });
    state.turns.push({ role: 'user', content: text });
    refreshChips(); save();
    if (state.turns.filter((t) => t.role === 'user').length === 1) track('chat_message', { page: PAGE });

    setBusy(true);
    const el = bubble('bot', 'Pensando…', 'thinking');
    let answer = '', pendingNav = null, failed = null;
    ctl = new AbortController();
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: state.turns.slice(-20), page: PAGE, lead: !!state.lead }),
        signal: ctl.signal,
      });
      if (!res.ok || !res.body) {
        failed = res.status === 429 ? 'busy' : 'fallback';
      } else {
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = '';
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let i;
          while ((i = buf.indexOf('\n\n')) >= 0) {
            const line = buf.slice(0, i).trim(); buf = buf.slice(i + 2);
            if (!line.startsWith('data:')) continue;
            let ev; try { ev = JSON.parse(line.slice(5)); } catch { continue; }
            if (ev.t === 'text') { answer += ev.v; el.classList.remove('thinking'); el.innerHTML = rich(answer); scrollLog(); }
            else if (ev.t === 'sep') { if (answer && !answer.endsWith('\n\n')) answer += '\n\n'; }
            else if (ev.t === 'tool' && ev.name === 'registrar_lead') { await handleLead(ev.input, 'Agente IA'); }
            else if (ev.t === 'tool' && ev.name === 'mostrar_pagina') { pendingNav = ev.input.path; }
            else if (ev.t === 'refusal') { failed = 'refusal'; }
            else if (ev.t === 'error') { failed = ev.code === 'busy' ? 'busy' : ev.code === 'not_configured' ? 'fallback' : 'upstream'; }
          }
        }
      }
    } catch (err) {
      if (err?.name !== 'AbortError') failed = 'upstream';
    } finally {
      setBusy(false); ctl = null;
    }

    answer = answer.trim();
    if (answer && failed !== 'refusal') {
      el.classList.remove('thinking'); el.innerHTML = rich(answer);
      state.shown.push({ r: 'a', t: answer.slice(0, 1500) });
      state.turns.push({ role: 'assistant', content: answer.slice(0, 1800) });
    } else if (!failed) {
      el.remove();
    }
    if (failed) {
      if (!answer || failed === 'refusal') el.remove();
      bubble('bot', failed === 'fallback' ? FALLBACK : ERRORS[failed] || ERRORS.upstream, 'err');
    }
    state.turns = state.turns.slice(-24); state.shown = state.shown.slice(-40);
    save(); scrollLog();

    if (pendingNav && pendingNav !== location.pathname) setTimeout(() => { location.href = pendingNav; }, 1200);
  }

  // ---------- Leads ----------
  const transcript = () => state.shown.slice(-20).map((m) => `${m.r === 'v' ? 'Visitante' : 'Zoe'}: ${m.t}`).join('\n\n');
  async function submitForm(fields) {
    const body = new URLSearchParams({ 'form-name': 'lead', ...fields });
    try {
      const r = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      return r.ok;
    } catch { return false; }
  }
  async function handleLead(input, origen) {
    const prev = state.lead || {};
    const lead = { ...prev, ...Object.fromEntries(Object.entries(input).filter(([, v]) => v)), origen: prev.origen || origen };
    state.lead = lead; save();
    renderHandoff(lead);
    const ok = await submitForm({
      nombre: lead.nombre || '', empresa: lead.empresa || '', contacto: lead.contacto || '', rubro: lead.rubro || '',
      necesidad: lead.necesidad || '', servicio: lead.servicio || '', interes: lead.interes || '', resumen: lead.resumen || '',
      origen: lead.origen, pagina: PAGE, conversacion: transcript(),
    });
    lead.saved = ok; save();
    if (!prev.nombre) track('generate_lead', { method: origen, interes: lead.interes });
  }
  function waLink(lead) {
    const t = `Hola, soy ${lead.nombre}${lead.empresa ? ` de ${lead.empresa}` : ''}. Vengo del chat de la web de Zolutions. ${lead.resumen || lead.necesidad || ''}`;
    return `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(t.slice(0, 600))}`;
  }
  function renderHandoff(lead) {
    const el = handoffEl && handoffEl.isConnected ? handoffEl : document.createElement('div');
    el.className = 'handoff'; el.innerHTML = '';
    const hd = document.createElement('div'); hd.className = 'hd'; hd.innerHTML = '<i></i>';
    const ht = document.createElement('span'); ht.textContent = `Listo, ${String(lead.nombre || '').split(' ')[0]}. Tu caso ya está con nuestro equipo.`; hd.appendChild(ht);
    const p = document.createElement('p'); p.textContent = `Un especialista te contactará por ${lead.contacto}. Si prefieres no esperar:`;
    const acts = document.createElement('div'); acts.className = 'acts';
    const a1 = document.createElement('a'); a1.className = 'btn btn-primary'; a1.href = CAL; a1.target = '_blank'; a1.rel = 'noopener'; a1.textContent = 'Agendar reunión ahora'; a1.dataset.track = 'agendar';
    const a2 = document.createElement('a'); a2.className = 'btn btn-ghost'; a2.href = waLink(lead); a2.target = '_blank'; a2.rel = 'noopener'; a2.textContent = 'Seguir por WhatsApp'; a2.dataset.track = 'whatsapp';
    acts.append(a1, a2);
    el.append(hd, p, acts);
    if (!handoffEl || !handoffEl.isConnected) { log.appendChild(el); handoffEl = el; }
    scrollLog();
  }

  // Formulario rápido "Hablar con una persona"
  $('humanBtn').addEventListener('click', () => {
    if (zoe.hidden) openChat();
    const existing = log.querySelector('.mini-form');
    if (existing) { existing.querySelector('input')?.focus(); return; }
    const f = document.createElement('form'); f.className = 'mini-form'; f.noValidate = true;
    f.innerHTML = `<b>Te contacta una persona del equipo</b>
      <label class="sr" for="mfName">Nombre</label><input id="mfName" placeholder="Tu nombre" autocomplete="name" maxlength="120">
      <label class="sr" for="mfCompany">Empresa</label><input id="mfCompany" placeholder="Empresa" autocomplete="organization" maxlength="160">
      <label class="sr" for="mfContact">WhatsApp o email</label><input id="mfContact" placeholder="WhatsApp o email" maxlength="160">
      <label class="sr" for="mfMsg">¿Qué necesitas?</label><textarea id="mfMsg" placeholder="¿Qué necesitas resolver?" maxlength="600"></textarea>
      <span class="muted" style="font-size:.76rem">Al enviar aceptas la <a href="/privacidad">política de privacidad</a>.</span>
      <span class="muted" id="mfErr" style="font-size:.8rem;color:var(--hot)"></span>
      <div class="r"><button type="button" class="btn btn-ghost btn-sm" id="mfCancel">Cancelar</button><button class="btn btn-primary btn-sm">Enviar</button></div>`;
    log.appendChild(f); scrollLog(); f.querySelector('#mfName').focus();
    f.querySelector('#mfCancel').addEventListener('click', () => f.remove());
    f.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const v = (id) => f.querySelector(id).value.trim();
      const nombre = v('#mfName'), empresa = v('#mfCompany'), contacto = v('#mfContact'), msg = v('#mfMsg');
      if (!nombre || !/\d{6,}|@/.test(contacto.replace(/[\s()+-]/g, ''))) { f.querySelector('#mfErr').textContent = 'Escribe tu nombre y un WhatsApp o email válido.'; return; }
      f.remove();
      const t = `Quiero hablar con una persona. Soy ${nombre}${empresa ? ` de ${empresa}` : ''}.`;
      bubble('me', t); state.shown.push({ r: 'v', t });
      state.turns.push({ role: 'user', content: `${t} Mi contacto: ${contacto}. ${msg}` });
      state.turns.push({ role: 'assistant', content: 'Gracias, ya derivé tu caso al equipo comercial.' });
      refreshChips();
      await handleLead({ nombre, empresa, contacto, necesidad: msg || 'Pidió hablar con una persona', interes: 'alto', servicio: 'Por definir', resumen: msg || 'Pidió hablar con una persona desde el chat.' }, 'Formulario del chat');
    });
  });

  // Restaurar al cambiar de página
  if (state.open) openChat();
}
