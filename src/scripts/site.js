// Menú móvil, consentimiento de cookies, Google Analytics 4 (solo si se acepta) y eventos de conversión.

const GA_ID = document.documentElement.dataset.ga;
const CONSENT_KEY = 'consent:v1';

// ---------- Menú móvil ----------
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
});

// ---------- Analítica con consentimiento ----------
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
let gaLoaded = false;
function loadGA() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}
window.zTrack = (name, params = {}) => { if (gaLoaded) gtag('event', name, params); };

const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
const writeConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch { /* sin almacenamiento */ } };
const banner = document.getElementById('cookieBanner');
function decide(v) {
  writeConsent(v);
  if (banner) banner.hidden = true;
  if (v === 'granted') loadGA();
}
const consent = readConsent();
if (consent === 'granted') loadGA();
else if (!consent && banner) banner.hidden = false;
document.getElementById('cookieAccept')?.addEventListener('click', () => decide('granted'));
document.getElementById('cookieReject')?.addEventListener('click', () => decide('denied'));
document.querySelectorAll('[data-cookie-settings]').forEach((b) => b.addEventListener('click', () => { if (banner) banner.hidden = false; }));

// ---------- Eventos de conversión ----------
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-track]');
  if (a) window.zTrack(a.dataset.track === 'agendar' ? 'schedule_click' : 'whatsapp_click', { page: location.pathname });
  const c = e.target.closest('[data-copy]');
  if (c) {
    const done = () => { const o = c.textContent; c.textContent = 'Copiado'; setTimeout(() => { c.textContent = o; }, 1400); };
    navigator.clipboard?.writeText(c.dataset.copy).then(done, () => {});
  }
});
document.querySelectorAll('form[data-netlify]').forEach((f) => f.addEventListener('submit', () => window.zTrack('generate_lead', { method: 'Formulario de contacto' })));
