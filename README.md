# zolutionsai.com

Sitio web de **Zolutions AI**: agentes de IA y automatización comercial para empresas.
Reemplaza el sitio hecho en Renderforest.

## Qué incluye

- **14 páginas indexables**, cada una con su title, descripción, H1, URL limpia y datos estructurados (empresa, servicio, precio, preguntas frecuentes, migas de pan). Sitemap y robots.txt automáticos.
- **Zoe, el agente de IA** (abajo a la derecha en todas las páginas):
  - Responde con la información del negocio.
  - Detecta interés y pide nombre, empresa y contacto.
  - Registra el lead y ofrece agendar o seguir por WhatsApp.
  - Puede llevar al visitante a la página que corresponde. La conversación se mantiene al cambiar de página.
- **Leads:** cada lead del chat y del formulario de contacto llega a **Netlify Forms** con el resumen y la conversación completa. Netlify te avisa por email.
- **Analítica:** Google Analytics 4 (`G-Z2L62JSLEH`). Solo se carga si el visitante acepta cookies. Registra estos eventos: `chat_open`, `chat_message`, `generate_lead`, `schedule_click` y `whatsapp_click`.

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/data/site.mjs` | **Todo el contenido**: servicios, precio del plan Básico, casos de éxito, preguntas frecuentes, industrias, contacto |
| `src/lib/agent.mjs` | Instrucciones, herramientas y validaciones del agente Zoe |
| `netlify/functions/chat.mjs` | Endpoint `/api/chat` que conversa con Claude, con un límite de 12 mensajes por minuto por IP |
| `src/pages/` | Páginas del sitio |
| `src/components/`, `src/layouts/` | Piezas reutilizables (menú, pie, chat, tarjetas) |
| `src/scripts/` | Chat, menú móvil, cookies y analítica |
| `public/` | Logo, ícono, imagen para redes (`og.png`), capturas de los casos, robots.txt y el formulario oculto de leads |
| `tests/` | Pruebas del agente y del endpoint |
| `demo/index.html` | Demo de diseño original (referencia, no se publica) |

Para cambiar un precio o un texto, edita `src/data/site.mjs`. El agente usa los mismos datos, así que se actualiza solo.

## Comandos

```bash
npm install
npm run dev     # sitio local en http://localhost:4321 (el chat necesita `netlify dev` para /api/chat)
npm run build   # genera dist/
npm test        # pruebas
node scripts/make-images.mjs   # regenera og.png e íconos
```

## Oferta publicada

- **Vendedor IA Básico:** $500.000 + IVA al mes (CLP). Incluye 100 conversaciones al mes en WhatsApp, web, Instagram y Facebook. Implementación sin costo y sin permanencia.
- **Vendedor IA Avanzado** y **soluciones de IA a medida:** se cotizan después de la evaluación gratuita.
- **Conversación:** todo lo que habla un mismo cliente en 24 horas, en cualquier canal.

## Marca

- Colores del logo: negro, morado `#500868`, cian `#00B0F0` y el destello (degradado `#C17BE6` → `#748DED` → `#3CC3F7`).
- Tipografías: Plus Jakarta Sans (títulos) y Figtree (texto).

## Publicar en Netlify (una sola vez)

1. **Crear el sitio:** en Netlify, Add new site → Import from GitHub → este repositorio. La configuración se toma de `netlify.toml` (build `npm run build`, carpeta `dist`).
2. **Clave de Claude:**
   - Crea una API key en [console.anthropic.com](https://console.anthropic.com) y carga saldo.
   - En Netlify, ve a Site configuration → Environment variables y agrega `ANTHROPIC_API_KEY` con esa clave. **Nunca la pegues en el código.**
   - Sin esta clave, el chat igual se ve, pero responde con el WhatsApp.
3. **Formularios:** en Forms, activa *Form detection* y vuelve a publicar. Después ve a Forms → Form notifications → Email notification, elige "Any form" y pon tu email. Debe ser el email de tu cuenta de Netlify.
4. **Dominio:**
   - Ve a Domain management → Add domain → `zolutionsai.com`.
   - Netlify te dirá qué registros DNS poner. Cámbialos donde está registrado el dominio (hoy, Renderforest) o transfiere el dominio.
   - Netlify activa HTTPS solo.
5. **Google Search Console:** agrega la propiedad `zolutionsai.com` y envía `https://zolutionsai.com/sitemap-index.xml`.

### Opcional
- `ZOE_MODEL`: el modelo de Claude, por defecto `claude-opus-5-5`. Para bajar el costo se puede usar `claude-haiku-5-5`, con respuestas algo menos elaboradas.
- `ZOE_EFFORT`: cuánto piensa el modelo antes de responder, por defecto `low`.
- `ALLOWED_ORIGINS`: dominios extra desde donde se permite usar el chat. Las vistas previas `*.netlify.app` ya están permitidas.

## Pendientes antes de publicar

- [ ] Crear el correo `contacto@zolutionsai.com`
- [ ] Completar la política de privacidad (razón social, RUT, plazo de conservación, fecha) y revisarla con un abogado
- [ ] Resultados medibles de Driver Assist AI y BudaFit para sumarlos a los casos (si existen)
