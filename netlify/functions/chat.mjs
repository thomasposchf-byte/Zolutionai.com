// Endpoint del agente Zoe: POST /api/chat
// Recibe la conversación del navegador y responde en streaming (eventos "data: {...}").

import Anthropic from '@anthropic-ai/sdk';
import { runChat, sanitizeRequest, DEFAULT_MODEL, DEFAULT_EFFORT } from '../../src/lib/agent.mjs';
import { SITE } from '../../src/data/site.mjs';

const env = (k) => (globalThis.Netlify?.env?.get(k) ?? process.env[k] ?? '').trim();
const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'];

function originAllowed(origin) {
  if (!origin) return false;
  let u;
  try { u = new URL(origin); } catch { return false; }
  const extra = env('ALLOWED_ORIGINS').split(',').map((s) => s.trim()).filter(Boolean);
  if ([SITE.url, 'https://www.zolutionsai.com', ...extra].includes(u.origin)) return true;
  if (u.protocol === 'https:' && u.hostname.endsWith('.netlify.app')) return true;
  return u.hostname === 'localhost' || u.hostname === '127.0.0.1';
}

const json = (data, status) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!originAllowed(req.headers.get('origin'))) return json({ error: 'forbidden' }, 403);

  const apiKey = env('ANTHROPIC_API_KEY');
  if (!apiKey) return json({ error: 'not_configured' }, 503);

  let body;
  try { body = await req.json(); } catch { return json({ error: 'bad_request' }, 400); }
  const parsed = sanitizeRequest(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);

  const model = env('ZOE_MODEL') || DEFAULT_MODEL;
  const effort = EFFORTS.includes(env('ZOE_EFFORT')) ? env('ZOE_EFFORT') : DEFAULT_EFFORT;
  const client = new Anthropic({ apiKey, maxRetries: 1, timeout: 45_000 });
  const abort = new AbortController();
  const enc = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => {
        try { controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`)); } catch { /* cliente desconectado */ }
      };
      try {
        await runChat({ client, messages: parsed.messages, send, signal: abort.signal, model, effort });
        send({ t: 'done' });
      } catch (err) {
        if (!abort.signal.aborted) {
          let code = 'upstream';
          if (err instanceof Anthropic.RateLimitError) code = 'busy';
          else if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) code = 'not_configured';
          else if (err instanceof Anthropic.BadRequestError) code = 'bad_request';
          console.error('chat error', code, err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : String(err));
          send({ t: 'error', code });
        }
      } finally {
        try { controller.close(); } catch { /* ya cerrado */ }
      }
    },
    cancel() { abort.abort(); },
  });

  return new Response(stream, {
    headers: { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-store', 'x-accel-buffering': 'no' },
  });
};

// Límite de uso por IP para proteger el costo de la API.
export const config = {
  path: '/api/chat',
  rateLimit: { windowLimit: 12, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
