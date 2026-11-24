// Contenido del sitio en un solo lugar. Lo usan las páginas (Astro) y el agente Zoe (función de Netlify).

export const SITE = {
  name: 'Zolutions AI',
  url: 'https://zolutionsai.com',
  email: 'contacto@zolutionsai.com',
  whatsapp: '56934125500',
  whatsappDisplay: '+56 9 3412 5500',
  phone: '+56934125500',
  calendar: 'https://calendar.app.google/zPvVhY4AAgs5jgYY7',
  linkedin: 'https://www.linkedin.com/company/106159308/',
  locality: 'Ñuñoa',
  city: 'Santiago',
  region: 'Región Metropolitana',
  country: 'CL',
  ga4: 'G-Z2L62JSLEH',
};

// Plan Básico de Vendedor IA (único precio publicado).
export const PLAN = {
  name: 'Vendedor IA Básico',
  amount: 500000,
  price: '$500.000',
  currency: 'CLP',
  conversations: 100,
};
export const PRICE_LINE = `${PLAN.price} + IVA al mes`;

export const waLink = (text) =>
  `https://api.whatsapp.com/send?phone=${SITE.whatsapp}${text ? `&text=${encodeURIComponent(text)}` : ''}`;

export const CHANNELS = ['WhatsApp', 'Web', 'Instagram', 'Facebook'];

// Lo que hace Vendedor IA (inicio y página del producto).
export const VENDEDOR = [
  ['chat', 'Responde en segundos', 'A cualquier hora y en todos tus canales, con tu información.'],
  ['target', 'Califica', 'Detecta quién quiere comprar: necesidad, presupuesto y urgencia.'],
  ['calendar', 'Agenda', 'Ofrece horarios y confirma la reunión en tu calendario.'],
  ['handoff', 'Te deriva el cliente', 'Tu equipo recibe al cliente listo, con el resumen.'],
];

// Lo que construimos a medida.
export const BUILD = [
  ['app', 'Apps y plataformas con IA', 'Para tus clientes o tu equipo, en web y celular.'],
  ['bot', 'Agentes para tu operación', 'Responden, registran y resuelven tareas por tu equipo.'],
  ['flow', 'Automatización de procesos', 'Menos planillas, menos trabajo manual, menos errores.'],
  ['plug', 'Integraciones', 'La IA conectada a tu CRM, ERP y herramientas.'],
];

export const BUILD_STEPS = [
  ['Idea', 'Conversamos tu proceso o tu idea. La evaluación es gratis.'],
  ['Prototipo', 'Construimos una primera versión para validarla rápido.'],
  ['Producto', 'La terminamos, la probamos y la ponemos en marcha.'],
  ['Mejora', 'Medimos y la mejoramos con tu equipo.'],
];

export const CASES = [
  {
    key: 'driver-assist-ai',
    name: 'Driver Assist AI',
    kind: 'Agente de WhatsApp y portal para automotoras',
    summary: 'Resuelve dudas técnicas por modelo, agenda mantenciones y coordina asistencia en ruta. El equipo ve todo en un panel.',
    challenge: 'Las automotoras reciben por WhatsApp preguntas técnicas, pedidos de mantención y emergencias en ruta, y el equipo no alcanza a responder todo a tiempo.',
    solution: 'Un agente de IA en WhatsApp que atiende a cada cliente según su auto, más un portal donde el equipo ve conversaciones, agenda, mantenciones y lo que necesita a una persona.',
    features: ['Agente de WhatsApp 24/7', 'Respuestas técnicas por modelo de auto', 'Agenda de mantenciones por taller', 'Coordinación de asistencia en ruta', 'Portal con métricas y alertas'],
    tags: ['WhatsApp', 'Agente IA', 'Portal web'],
    image: '/casos/driver-assist-ai.webp',
    link: 'https://driverassistai.netlify.app',
    linkLabel: 'Ver demo',
    note: 'La demo usa datos de ejemplo.',
  },
  {
    key: 'budafit',
    name: 'BudaFit',
    kind: 'App de entrenamiento y nutrición con coach IA',
    summary: 'Reconoce la comida en una foto, anota el entreno que le dictas por voz y te dice qué peso hacer hoy.',
    challenge: 'Quien entrena anota sus series en el celular y usa una app distinta para cada cosa, sin saber si de verdad está avanzando.',
    solution: 'Una app que junta entreno, comida y hábitos con un coach IA que entiende español de Chile y reconoce también la comida chilena.',
    features: ['Visión IA: calorías y proteína desde una foto', 'Coach por voz que registra cada serie', 'Sugerencia de peso y repeticiones', 'Avatar, misiones y rachas', 'Funciona en iPhone y Android'],
    tags: ['App', 'Visión IA', 'Voz'],
    image: '/casos/budafit.webp',
    link: 'https://budafit.netlify.app',
    linkLabel: 'Ver proyecto',
    note: 'Beta cerrada en diciembre de 2026.',
  },
];

export const SOLUTIONS = [
  {
    key: 'desarrollo-a-medida',
    path: '/soluciones/desarrollo-ia-a-medida',
    name: 'Soluciones de IA a medida',
    icon: 'app',
    short: 'Apps, plataformas y automatizaciones con IA hechas para tu negocio.',
    plazo: 'Según el proyecto',
    lead: 'Diseñamos y desarrollamos software con IA para tu negocio, del prototipo al producto en uso.',
    seo: {
      title: 'Desarrollo de soluciones de IA a medida | Zolutions AI',
      desc: 'Apps, plataformas, agentes y automatizaciones con inteligencia artificial hechas para tu negocio. Del prototipo al producto. Evaluación gratis.',
    },
    faq: [
      ['¿Cuánto demora un proyecto a medida?', 'Entre 1 y 6 meses según el alcance. Partimos con un prototipo para validar rápido.'],
      ['¿Cuánto cuesta?', 'Depende del alcance. Lo cotizamos después de una evaluación gratuita.'],
      ['¿Qué necesito para partir?', 'Solo tu idea o el proceso que quieres mejorar. Nosotros lo bajamos a un plan.'],
    ],
  },
  {
    key: 'agentes-ia-whatsapp',
    path: '/soluciones/agentes-ia-whatsapp',
    name: 'Agentes IA para WhatsApp',
    icon: 'chat',
    short: 'Agentes que atienden 24/7 en WhatsApp, web, Instagram y Facebook.',
    h1: 'Agentes de IA para WhatsApp, web y redes sociales',
    lead: 'Un agente entrenado con tu información que responde en segundos, agenda y deriva a tu equipo.',
    plazo: '~7 días',
    canal: 'WhatsApp, web, Instagram, Facebook',
    precio: `Desde ${PRICE_LINE}`,
    pains: ['Consultas de noche que se responden al día siguiente', 'Ejecutivos repitiendo las mismas respuestas', 'Clientes que se enfrían esperando'],
    incluye: ['Entrenado con tus productos, precios y políticas', 'WhatsApp, chat web, Instagram y Facebook', 'Agenda en tu calendario', 'Deriva a tu equipo con resumen'],
    faq: [
      ['¿Es un chatbot?', 'No. Entiende preguntas abiertas y recuerda el contexto, sin menús de botones.'],
      ['¿Qué pasa si no sabe algo?', 'Lo reconoce y deriva la conversación a tu equipo, en vez de inventar.'],
    ],
    seo: {
      title: 'Agentes IA para WhatsApp, web y redes | Zolutions AI',
      desc: 'Agentes de IA que responden 24/7 en WhatsApp, web, Instagram y Facebook, agendan y derivan a tu equipo. Desde $500.000 + IVA al mes.',
    },
  },
  {
    key: 'automatizacion-comercial',
    path: '/soluciones/automatizacion-comercial',
    name: 'Automatización comercial',
    icon: 'flow',
    short: 'Captación, seguimiento y CRM conectados en un solo flujo.',
    h1: 'Automatización comercial con IA',
    lead: 'Conectamos captación, seguimiento y CRM para que ningún cliente quede sin respuesta.',
    plazo: '2 a 6 semanas',
    canal: 'WhatsApp, email, CRM',
    pains: ['Leads repartidos en varias planillas', 'Seguimientos que dependen de la memoria', 'Reportes armados a mano'],
    incluye: ['Captura automática de leads', 'Asignación al ejecutivo correcto', 'Seguimiento por WhatsApp y email', 'Registro en tu CRM y reportes'],
    faq: [
      ['¿Necesito un CRM?', 'No. Si no tienes, te recomendamos uno simple y lo configuramos.'],
      ['¿Cambia cómo trabaja mi equipo?', 'Lo mínimo. Se adapta a tu proceso y quita lo repetitivo.'],
    ],
    seo: {
      title: 'Automatización comercial con IA | Zolutions AI',
      desc: 'Automatiza captación, seguimiento y registro en CRM con IA. Ningún cliente sin respuesta ni sin siguiente paso. Evaluación gratis.',
    },
  },
  {
    key: 'optimizacion-ads-ia',
    path: '/soluciones/optimizacion-ads-ia',
    name: 'Ads con IA',
    icon: 'ads',
    short: 'Invierte solo en los anuncios que generan ventas.',
    h1: 'Campañas de Ads optimizadas con IA',
    lead: 'Medimos qué anuncios traen ventas, no solo clics, y los optimizamos en tiempo real.',
    plazo: '2 a 4 semanas',
    canal: 'Meta Ads, Google Ads',
    pains: ['No sabes qué anuncio vende', 'Tracking incompleto', 'Ajustes que llegan tarde'],
    incluye: ['Tracking completo de conversiones', 'Anuncios conectados a ventas reales', 'Optimización continua con IA', 'Panel de costo por venta'],
    faq: [
      ['¿Reemplaza a mi agencia?', 'No necesariamente. Podemos trabajar junto a tu agencia.'],
      ['¿Desde qué inversión conviene?', 'Depende del rubro. Lo vemos en la evaluación gratuita.'],
    ],
    seo: {
      title: 'Optimización de campañas Ads con IA | Zolutions AI',
      desc: 'Tracking completo e IA que optimiza tus campañas de Meta y Google Ads en tiempo real según las ventas que generan, no solo los clics.',
    },
  },
  {
    key: 'integraciones-ia',
    path: '/soluciones/integraciones-ia',
    name: 'Integraciones',
    icon: 'plug',
    short: 'La IA conectada a tu CRM, ERP y herramientas.',
    h1: 'Integraciones de IA con tus sistemas',
    lead: 'Hacemos que la IA lea y registre datos en los sistemas que ya usas.',
    plazo: '1 a 6 semanas',
    canal: 'API, webhooks',
    pains: ['Sistemas que no se comunican', 'Doble digitación', 'Herramientas de IA aisladas'],
    incluye: ['CRM, ERP, e-commerce y planillas', 'APIs y webhooks a medida', 'Flujos automáticos', 'Accesos seguros y monitoreo'],
    faq: [
      ['¿Con qué sistemas integran?', 'Con la mayoría de los que tienen API o exportan datos.'],
      ['¿Es seguro?', 'Usamos accesos mínimos y controlados en cada integración.'],
    ],
    seo: {
      title: 'Integraciones de IA con tu CRM y sistemas | Zolutions AI',
      desc: 'Conectamos la IA con tu CRM, ERP, e-commerce, calendario y planillas para que lea y registre datos automáticamente. Integraciones a medida.',
    },
  },
  {
    key: 'asesoria-ia',
    path: '/asesoria-ia',
    name: 'Asesoría IA',
    icon: 'compass',
    short: 'Te ayudamos a decidir dónde y cómo usar IA.',
    h1: 'Asesoría en inteligencia artificial para empresas',
    lead: 'Te ayudamos a decidir dónde la IA genera retorno y en qué orden implementarla.',
    plazo: 'Desde el día 1',
    canal: 'Reuniones y talleres',
    pains: ['No saber por dónde empezar', 'Pilotos que no pasan de prueba', 'Herramientas que nadie usa'],
    incluye: ['Diagnóstico de procesos', 'Hoja de ruta priorizada', 'Selección de herramientas', 'Capacitación a equipos'],
    faq: [
      ['¿La primera evaluación tiene costo?', 'No, es gratis.'],
      ['¿Trabajan fuera de Chile?', 'Sí, con empresas de cualquier país.'],
    ],
    seo: {
      title: 'Asesoría en IA para empresas | Zolutions AI',
      desc: 'Diagnóstico, hoja de ruta y acompañamiento para implementar inteligencia artificial donde genera retorno en tu empresa. Primera evaluación gratis.',
    },
  },
];

export const INDUSTRIES = [
  ['Inmobiliarias', ['Responde por cada propiedad', 'Califica por presupuesto y comuna', 'Agenda visitas']],
  ['Automotriz', ['Cotiza modelos', 'Agenda test drives y mantenciones', 'Atiende dudas técnicas']],
  ['Salud y clínicas', ['Agenda y confirma horas', 'Responde sobre prestaciones', 'Reduce inasistencias']],
  ['Retail y e-commerce', ['Recomienda productos', 'Informa stock y despacho', 'Recupera carritos']],
  ['Educación', ['Informa programas y aranceles', 'Agenda entrevistas', 'Sigue hasta la matrícula']],
  ['Servicios B2B', ['Califica solicitudes', 'Prepara la propuesta', 'Agenda reuniones']],
];

export const FAQ = [
  ['¿Es un chatbot?', 'No. Usa IA generativa: entiende lo que te escriben, recuerda el contexto y responde con tu información.'],
  ['¿Cuánto demora?', 'Vendedor IA queda funcionando en unos 7 días. Un proyecto a medida toma entre 1 y 6 meses.'],
  ['¿Cuánto cuesta?', `Vendedor IA Básico cuesta ${PRICE_LINE}, sin costo de implementación y sin permanencia. Los proyectos a medida se cotizan tras una evaluación gratis.`],
  ['¿Trabajan fuera de Chile?', 'Sí. Trabajamos desde Santiago con empresas de cualquier país.'],
];

export const VFAQ = [
  ['¿En qué se diferencia de un chatbot?', 'Un chatbot responde. Vendedor IA vende: califica, agenda y sigue al cliente hasta la compra.'],
  ['¿Puede equivocarse?', 'Puede pasar. Por eso solo usa tu información y deriva a tu equipo cuando no está seguro.'],
  ['¿Y si el cliente quiere hablar con una persona?', 'Lo deriva de inmediato, con el resumen de la conversación.'],
];

export const PFAQ = [
  ['¿Qué cuenta como una conversación?', 'Todo lo que habla un mismo cliente en 24 horas, en cualquier canal. Si escribe diez veces ese día, es una.'],
  ['¿La implementación tiene costo?', 'No, en el plan Básico. En los planes a medida se define en la propuesta.'],
  ['¿Hay permanencia?', 'No. Es un plan mensual y puedes cancelarlo cuando quieras.'],
  ['¿Qué pasa con las tarifas de WhatsApp?', 'Responder a quien te escribe no tiene costo de Meta. Los mensajes que inicia tu empresa tienen una tarifa de Meta aparte.'],
  ['¿Puedo cambiar de plan?', 'Sí. Puedes partir con el Básico y pasar al Avanzado cuando lo necesites.'],
];

// Páginas que el agente puede mostrar al visitante (clave -> ruta y nombre).
export const PAGES = {
  inicio: { path: '/', name: 'Inicio' },
  'vendedor-ia': { path: '/vendedor-ia', name: 'Vendedor IA' },
  soluciones: { path: '/soluciones', name: 'Soluciones' },
  ...Object.fromEntries(SOLUTIONS.map((s) => [s.key, { path: s.path, name: s.name }])),
  casos: { path: '/casos', name: 'Casos de éxito' },
  industrias: { path: '/industrias', name: 'Industrias' },
  precios: { path: '/precios', name: 'Precios' },
  contacto: { path: '/contacto', name: 'Contacto' },
};
