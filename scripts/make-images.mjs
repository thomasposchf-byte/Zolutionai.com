// Genera og.png, logo.png, apple-touch-icon.png y favicon-32.png en public/. Uso: node scripts/make-images.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // Playwright instalado en el sistema, no es dependencia del sitio
const og = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Figtree:wght@500&family=JetBrains+Mono:wght@500&display=swap">
<style>
body{margin:0;width:1200px;height:630px;background:radial-gradient(55% 75% at 85% 30%,rgba(244,181,87,.22),transparent 70%),#0A0F1E;color:#EAEEF7;font-family:Figtree,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;box-sizing:border-box}
.brand{display:flex;align-items:center;gap:16px;font:800 40px 'Bricolage Grotesque';letter-spacing:-.02em}.brand b{color:#F4B557}
h1{font:800 76px/1.02 'Bricolage Grotesque';letter-spacing:-.03em;margin:0;max-width:960px}h1 em{font-style:normal;color:#F4B557}
.row{display:flex;gap:14px;font:500 22px 'JetBrains Mono';color:#9AA5C0;text-transform:uppercase;letter-spacing:.06em}
.row span{border:1px solid #26325A;border-radius:999px;padding:10px 18px}
</style></head><body>
<div class="brand"><svg width="56" height="56" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#F4B557"/><path d="M10 10.5h12L10 21.5h12" fill="none" stroke="#1B1304" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Zolutions <b>AI</b></span></div>
<h1>Agentes de IA que <em>venden</em> por tu empresa, 24/7</h1>
<div class="row"><span>WhatsApp</span><span>Web</span><span>Instagram</span><span>Facebook</span><span>Desde US$500/mes</span></div>
</body></html>`;
const mark = (size, pad) => `<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;background:${pad ? '#0A0F1E' : 'transparent'};display:grid;place-items:center">
<svg width="${size - pad * 2}" height="${size - pad * 2}" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#F4B557"/><path d="M10 10.5h12L10 21.5h12" fill="none" stroke="#1B1304" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></body></html>`;
const b = await chromium.launch();
const shot = async (html, w, h, file, transparent = false) => {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.screenshot({ path: `public/${file}`, omitBackground: transparent });
  await p.close();
};
await shot(og, 1200, 630, 'og.png');
await shot(mark(512, 0), 512, 512, 'logo.png', true);
await shot(mark(180, 0), 180, 180, 'apple-touch-icon.png', true);
await shot(mark(32, 0), 32, 32, 'favicon-32.png', true);
await b.close();
console.log('ok');
