// Genera og.png, apple-touch-icon.png y favicon-32.png en public/. Uso: node scripts/make-images.mjs
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright'); // Playwright instalado en el sistema, no es dependencia del sitio
const logo = `data:image/png;base64,${readFileSync('public/logo.png').toString('base64')}`;
const spark = (fill, size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C17BE6"/><stop offset=".5" stop-color="#748DED"/><stop offset="1" stop-color="#3CC3F7"/></linearGradient></defs><path d="M12 1C12 7.1 16.9 12 23 12 16.9 12 12 16.9 12 23 12 16.9 7.1 12 1 12 7.1 12 12 7.1 12 1Z" fill="${fill}"/></svg>`;
const og = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Figtree:wght@600&display=swap">
<style>
body{margin:0;width:1200px;height:630px;box-sizing:border-box;padding:70px 80px;background:radial-gradient(45% 60% at 92% 12%,rgba(60,195,247,.22),transparent 70%),radial-gradient(50% 70% at 80% 100%,rgba(193,123,230,.25),transparent 70%),#fff;font-family:Figtree,sans-serif;display:flex;flex-direction:column;justify-content:space-between;color:#141019}
h1{font:800 78px/1.04 'Plus Jakarta Sans';letter-spacing:-.035em;margin:0;max-width:900px}h1 span{color:#500868}
.row{display:flex;gap:14px;font-size:24px;color:#4F4A5C}.row b{color:#500868}
.row span{border:2px solid #E7E2EE;border-radius:999px;padding:10px 20px;background:#fff}
</style></head><body>
<img src="${logo}" style="height:58px;width:auto;align-self:flex-start">
<h1>IA que <span>vende</span> y <span>trabaja</span> por tu empresa</h1>
<div class="row"><span>Vendedor IA</span><span>Soluciones a medida</span><span>Desde <b>$500.000 + IVA</b>/mes</span></div>
</body></html>`;
const icon = (size) => `<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:transparent">
<div style="width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.24)}px;background:#500868;display:grid;place-items:center">${spark('url(#g)', Math.round(size * 0.68))}</div></body></html>`;
const b = await chromium.launch();
const shot = async (html, w, h, file, transparent = false) => {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.screenshot({ path: `public/${file}`, omitBackground: transparent });
  await p.close();
};
await shot(og, 1200, 630, 'og.png');
await shot(icon(180), 180, 180, 'apple-touch-icon.png', true);
await shot(icon(32), 32, 32, 'favicon-32.png', true);
await b.close();
console.log('ok');
