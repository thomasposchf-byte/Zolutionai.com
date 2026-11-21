# zolutionsai.com

Nuevo sitio web de **Zolutions AI**: agentes de IA y automatización comercial para empresas.
Reemplaza el sitio actual hecho en Renderforest.

## Estado

**Fase 1: demo de diseño y usabilidad.** La versión de producción todavía no existe.

- `demo/index.html` es la demo navegable, un solo archivo que se abre en cualquier navegador.
- El agente Zoe y el panel de leads funcionan solo dentro del artifact de Claude (la demo publicada). En el navegador, Zoe pasa a "modo vista previa" y ofrece WhatsApp y un formulario.

## Mapa del sitio (URLs definitivas)

| Página | URL |
|---|---|
| Inicio | `/` |
| Vendedor IA | `/vendedor-ia` |
| Soluciones | `/soluciones` |
| Agentes IA conversacionales | `/soluciones/agentes-ia-whatsapp` |
| Automatización comercial | `/soluciones/automatizacion-comercial` |
| Optimización de Ads con IA | `/soluciones/optimizacion-ads-ia` |
| Integraciones | `/soluciones/integraciones-ia` |
| Desarrollo a medida | `/soluciones/desarrollo-ia-a-medida` |
| Asesoría IA | `/asesoria-ia` |
| Industrias | `/industrias` |
| Precios | `/precios` |
| Casos | `/casos` |
| Contacto | `/contacto` |
| Privacidad | `/privacidad` |

Cada página tiene su propio title, meta description, H1 y datos estructurados. En la demo se ven con el botón "Ver SEO de esta página".

## Oferta publicada

- **Agente Conversacional:** desde US$500 al mes + IVA, 100 conversaciones mensuales, omnicanal (WhatsApp, web, Instagram, Facebook Messenger). Implementación sin costo. Plan mensual sin permanencia: se cancela cuando se quiera.
- **Vendedor IA** y **Empresa:** a medida, se cotizan después de la evaluación gratuita.
- Más de 100 conversaciones: no se publica; se cotiza solo si el cliente pregunta.

## Decisiones pendientes

- [ ] Cómo se cuenta una conversación (la demo usa "un mismo cliente dentro de 24 horas")
- [ ] Logos y 2 o 3 casos reales de clientes
- [ ] Crear el correo `contacto@zolutionsai.com`
- [ ] Completar y revisar con un abogado la política de privacidad (razón social, RUT, plazo de conservación)
- [ ] Nombre definitivo del agente (hoy: Zoe)

## Próximos pasos

1. Ajustar la demo con tus comentarios.
2. Construir la versión de producción: páginas estáticas para SEO, sitemap, datos estructurados, el agente conectado a la API de Claude, los leads guardados en una base de datos y avisos por email y WhatsApp.
3. Publicar en Netlify y apuntar el dominio `zolutionsai.com`, sin cortar el sitio actual.
