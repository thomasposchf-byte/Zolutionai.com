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
  price: { amount: 500, currency: 'USD', conversations: 100 },
};

export const waLink = (text) =>
  `https://api.whatsapp.com/send?phone=${SITE.whatsapp}${text ? `&text=${encodeURIComponent(text)}` : ''}`;

export const CHANNELS = ['WhatsApp', 'Web', 'Instagram', 'Facebook'];

export const SOLUTIONS = [
  {
    key: 'agentes-ia-whatsapp',
    path: '/soluciones/agentes-ia-whatsapp',
    name: 'Agentes IA conversacionales',
    icon: 'chat',
    short: 'Agentes que conversan como una persona en WhatsApp, web, Instagram y Facebook y responden 24/7.',
    h1: 'Agentes de IA omnicanal: WhatsApp, web, Instagram y Facebook',
    lead: 'Un agente entrenado con la información de tu empresa que conversa con naturalidad, responde en segundos y resuelve qué pasa después: agenda, cotiza o deriva a tu equipo.',
    plazo: '~7 días',
    canal: 'WhatsApp, web, Instagram, Facebook',
    precio: 'Desde US$500/mes + IVA',
    pains: [
      'Consultas de noche o fin de semana que se responden al día siguiente',
      'Ejecutivos repitiendo las mismas respuestas todo el día',
      'Prospectos que se enfrían mientras esperan una respuesta',
    ],
    incluye: [
      'Entrenamiento con tus productos, precios, políticas y preguntas frecuentes',
      'Atención omnicanal: WhatsApp Business, chat web, Instagram y Facebook Messenger',
      'Agendamiento directo en tu calendario',
      'Derivación a una persona con el resumen de la conversación',
      'Panel con conversaciones y métricas',
      'Ajustes continuos y soporte 24/7',
    ],
    ideal: 'Empresas que reciben muchas consultas repetitivas por WhatsApp o redes sociales y quieren responder al instante sin sumar personal.',
    faq: [
      ['¿Es un chatbot?', 'No. Usa IA generativa: entiende preguntas abiertas, recuerda el contexto de la conversación y responde con tu información, sin menús de botones.'],
      ['¿Qué pasa si no sabe responder algo?', 'Lo reconoce y deriva la conversación a tu equipo con el resumen, en vez de inventar una respuesta.'],
      ['¿Cuánto cuesta?', 'Desde US$500 al mes + IVA, con 100 conversaciones mensuales, implementación sin costo y sin permanencia.'],
    ],
    seo: {
      title: 'Agentes IA para WhatsApp, web y redes | Zolutions AI',
      desc: 'Agentes de IA que responden 24/7 en WhatsApp, web, Instagram y Facebook, agendan y derivan a tu equipo. Desde US$500 al mes + IVA, listos en 7 días.',
    },
  },
  {
    key: 'automatizacion-comercial',
    path: '/soluciones/automatizacion-comercial',
    name: 'Automatización comercial',
    icon: 'flow',
    short: 'Captación, calificación, seguimiento y CRM conectados en un solo flujo automático.',
    h1: 'Automatización comercial con IA, del primer mensaje al cierre',
    lead: 'Conectamos captación, calificación, seguimiento y CRM para que ningún prospecto quede sin respuesta ni sin un siguiente paso.',
    plazo: '2 a 6 semanas',
    canal: 'WhatsApp, email, CRM',
    pains: [
      'Leads que llegan por varios canales y terminan en planillas distintas',
      'Seguimientos que dependen de la memoria de cada ejecutivo',
      'Reportes comerciales armados a mano cada semana',
    ],
    incluye: [
      'Captura automática de leads desde formularios, WhatsApp y anuncios',
      'Calificación y asignación al ejecutivo correcto',
      'Secuencias de seguimiento por WhatsApp y email',
      'Registro automático en tu CRM',
      'Alertas cuando un prospecto muestra intención de compra',
      'Reporte comercial automático',
    ],
    ideal: 'Equipos comerciales que pierden oportunidades por falta de seguimiento o por trabajo manual entre sistemas.',
    faq: [
      ['¿Necesito tener un CRM?', 'No es obligatorio. Si no tienes uno, te recomendamos el más simple para tu operación y lo configuramos.'],
      ['¿Mis vendedores tienen que cambiar su forma de trabajar?', 'Lo mínimo. La automatización se adapta a tu proceso actual y elimina las tareas repetitivas.'],
    ],
    seo: {
      title: 'Automatización comercial con IA | Zolutions AI',
      desc: 'Automatiza captación, calificación, seguimiento y registro en CRM con IA. Ningún prospecto sin respuesta ni sin siguiente paso. Evaluación gratis.',
    },
  },
  {
    key: 'optimizacion-ads-ia',
    path: '/soluciones/optimizacion-ads-ia',
    name: 'Optimización de Ads con IA',
    icon: 'ads',
    short: 'Tracking e inteligencia de datos para invertir en los anuncios que generan ventas.',
    h1: 'Campañas de Ads optimizadas con IA y datos reales de venta',
    lead: 'Medimos qué campañas traen ventas, no solo clics. Nuestro modelo de IA analiza, gestiona y optimiza tus campañas en tiempo real.',
    plazo: '2 a 4 semanas',
    canal: 'Meta Ads, Google Ads',
    pains: [
      'Presupuesto en anuncios sin saber cuáles generan ventas',
      'Tracking incompleto entre el anuncio, la conversación y la venta',
      'Optimizaciones manuales que llegan tarde',
    ],
    incluye: [
      'Auditoría y configuración de tracking: píxeles, conversiones y eventos',
      'Conexión entre anuncios, conversaciones y ventas cerradas',
      'Análisis y optimización continua con IA',
      'Alertas de gasto y rendimiento',
      'Panel de costo por lead y costo por venta',
    ],
    ideal: 'Empresas que invierten en Meta o Google Ads y quieren saber exactamente qué anuncios generan ventas.',
    faq: [
      ['¿Reemplaza a mi agencia de marketing?', 'No necesariamente. Podemos trabajar con tu agencia aportando el tracking y la optimización con IA.'],
      ['¿Desde qué inversión conviene?', 'Depende de tu rubro. Lo revisamos en la evaluación gratuita.'],
    ],
    seo: {
      title: 'Optimización de campañas Ads con IA | Zolutions AI',
      desc: 'Tracking completo e IA que analiza y optimiza tus campañas de Meta y Google Ads en tiempo real según las ventas que generan, no solo los clics.',
    },
  },
  {
    key: 'integraciones-ia',
    path: '/soluciones/integraciones-ia',
    name: 'Integraciones personalizadas',
    icon: 'plug',
    short: 'Conectamos la IA con tu CRM, ERP, e-commerce y las herramientas que ya usas.',
    h1: 'Integraciones de IA con tu CRM, ERP y herramientas',
    lead: 'Hacemos que la IA trabaje con los sistemas que ya usas: lee y registra datos donde tu equipo los necesita.',
    plazo: '1 a 6 semanas',
    canal: 'API, webhooks',
    pains: [
      'Información repartida entre sistemas que no se comunican',
      'Doble digitación entre CRM, planillas y facturación',
      'Herramientas de IA aisladas que nadie usa',
    ],
    incluye: [
      'Conexión con CRM, ERP, e-commerce, calendarios y planillas',
      'APIs y webhooks a medida',
      'Flujos automáticos entre sistemas',
      'Control de accesos y seguridad',
      'Documentación y monitoreo',
    ],
    ideal: 'Empresas con varios sistemas que necesitan que la IA consulte y registre información automáticamente.',
    faq: [
      ['¿Con qué sistemas pueden integrar?', 'Con la mayoría de los que tienen API o exportación de datos. Lo confirmamos en la evaluación.'],
      ['¿Es seguro conectar mis sistemas?', 'Trabajamos con accesos mínimos y controlados para cada integración.'],
    ],
    seo: {
      title: 'Integraciones de IA con tu CRM y sistemas | Zolutions AI',
      desc: 'Conectamos la IA con tu CRM, ERP, e-commerce, calendario y planillas para que lea y registre datos automáticamente. Integraciones a medida y seguras.',
    },
  },
  {
    key: 'desarrollo-a-medida',
    path: '/soluciones/desarrollo-ia-a-medida',
    name: 'Soluciones a medida',
    icon: 'build',
    short: 'Diseñamos y construimos la solución de IA que tu desafío necesita.',
    h1: 'Desarrollo de soluciones de IA a medida',
    lead: 'Cuando tu desafío no calza con un producto estándar, lo diseñamos y construimos contigo, desde el prototipo hasta la operación.',
    plazo: '1 a 6 meses',
    canal: 'Según el proyecto',
    pains: [
      'Procesos internos únicos que ningún software resuelve',
      'Documentos o datos que se procesan a mano',
      'Ideas de IA sin un equipo técnico para ejecutarlas',
    ],
    incluye: [
      'Levantamiento del proceso y caso de negocio',
      'Prototipo funcional para validar',
      'Desarrollo, pruebas e implementación',
      'Capacitación de tu equipo',
      'Mejora continua y soporte 24/7',
    ],
    ideal: 'Empresas con un proceso específico que quieren automatizar o mejorar con IA.',
    faq: [
      ['¿Cuánto demora un proyecto a medida?', 'Entre 1 y 6 meses según el alcance. Partimos con un prototipo para validar rápido.'],
      ['¿El desarrollo queda para mi empresa?', 'Lo definimos en la propuesta según el tipo de proyecto.'],
    ],
    seo: {
      title: 'Desarrollo de IA a medida para empresas | Zolutions AI',
      desc: 'Diseñamos y desarrollamos soluciones de inteligencia artificial a medida: del prototipo a la operación, con capacitación y soporte 24/7.',
    },
  },
  {
    key: 'asesoria-ia',
    path: '/asesoria-ia',
    name: 'Asesorías IA',
    icon: 'compass',
    short: 'Especialistas que te acompañan a decidir dónde y cómo usar IA, desde el día 1.',
    h1: 'Asesoría en inteligencia artificial para empresas',
    lead: 'Te ayudamos a decidir dónde la IA genera retorno en tu empresa y en qué orden implementarla.',
    plazo: 'Desde el día 1',
    canal: 'Reuniones y talleres',
    pains: [
      'No saber por dónde empezar con IA',
      'Pilotos que nunca pasan de prueba',
      'Invertir en herramientas que el equipo no adopta',
    ],
    incluye: [
      'Diagnóstico de procesos y oportunidades',
      'Hoja de ruta priorizada por impacto y esfuerzo',
      'Selección de herramientas y proveedores',
      'Acompañamiento en la implementación',
      'Capacitación a equipos',
    ],
    ideal: 'Gerencias que quieren una estrategia de IA clara antes de invertir.',
    faq: [
      ['¿La primera evaluación tiene costo?', 'No. La evaluación inicial es gratuita.'],
      ['¿Trabajan con empresas fuera de Chile?', 'Sí, operamos desde Santiago para empresas de cualquier país.'],
    ],
    seo: {
      title: 'Asesoría en IA para empresas | Zolutions AI',
      desc: 'Diagnóstico, hoja de ruta y acompañamiento para implementar inteligencia artificial donde genera retorno en tu empresa. Primera evaluación gratis.',
    },
  },
];

export const STEPS = [
  ['Evaluación', 'Gratis', 'Revisamos tu proceso comercial actual y detectamos dónde la IA tendría más impacto.'],
  ['Diseño y desarrollo', 'Días o semanas', 'Construimos y entrenamos la solución con la información y el tono de tu empresa.'],
  ['Optimización', 'Continua', 'Medimos resultados, ajustamos y mejoramos cada semana.'],
];

export const INDUSTRIES = [
  ['Inmobiliarias', ['Responde consultas por propiedad las 24 horas', 'Califica por presupuesto, comuna y financiamiento', 'Agenda visitas en el calendario de cada corredor']],
  ['Retail y e-commerce', ['Recomienda productos según lo que busca el cliente', 'Informa stock, despachos y cambios', 'Recupera carritos abandonados por WhatsApp']],
  ['Salud y clínicas', ['Agenda, confirma y recuerda horas', 'Responde sobre prestaciones, convenios y preparación', 'Reduce inasistencias con recordatorios automáticos']],
  ['Educación', ['Informa programas, aranceles y fechas', 'Califica postulantes y agenda entrevistas', 'Hace seguimiento hasta la matrícula']],
  ['Automotriz', ['Cotiza modelos y versiones', 'Agenda test drives y servicio técnico', 'Deriva al vendedor con el perfil del cliente']],
  ['Servicios profesionales y B2B', ['Califica solicitudes según tamaño y necesidad', 'Prepara la información para la propuesta', 'Agenda reuniones con el área comercial']],
  ['Turismo y hotelería', ['Responde disponibilidad y tarifas en varios idiomas', 'Gestiona reservas y cambios', 'Ofrece servicios adicionales durante la estadía']],
];

export const FAQ = [
  ['¿Sus agentes conversacionales son un chatbot?', 'No. Usan inteligencia artificial generativa: entienden lenguaje natural, recuerdan el contexto de la conversación y responden con la información de tu empresa, sin menús de botones.'],
  ['¿Cuánto demora implementar una solución de IA?', 'Un agente conversacional toma alrededor de 7 días. Las soluciones a medida pueden tomar hasta 6 meses, según su alcance.'],
  ['¿Cuánto cuesta?', 'Un agente conversacional parte desde US$500 al mes + IVA, con 100 conversaciones mensuales en WhatsApp, web, Instagram y Facebook, implementación sin costo y sin permanencia. Vendedor IA y las soluciones a medida se cotizan después de una evaluación gratuita.'],
  ['¿En qué canales funcionan los agentes?', 'En WhatsApp, chat web, Instagram y Facebook Messenger, todos conectados al mismo agente.'],
  ['¿En qué industrias trabajan?', 'En casi todas: inmobiliarias, retail, salud, educación, automotriz, servicios profesionales y turismo, entre otras.'],
  ['¿Trabajan con empresas fuera de Chile?', 'Sí. Operamos desde Santiago para empresas de cualquier país.'],
  ['¿Tienen soporte técnico?', 'Sí. Todas nuestras soluciones incluyen soporte técnico 24/7.'],
];

export const VFAQ = [
  ['¿En qué se diferencia de un chatbot?', 'Un chatbot responde preguntas. Vendedor IA tiene un objetivo comercial: califica, recomienda, agenda y hace seguimiento hasta que el cliente avanza en la compra.'],
  ['¿Puede equivocarse?', 'Puede pasar. Por eso lo entrenamos solo con tu información, le definimos qué no debe responder y deriva a tu equipo cuando no está seguro.'],
  ['¿Qué pasa cuando el cliente quiere hablar con una persona?', 'Lo deriva de inmediato a tu equipo con el resumen de la conversación, para que nadie tenga que volver a preguntar lo mismo.'],
  ['¿Cuánto cuesta?', 'Vendedor IA se cotiza según canales, volumen e integraciones. Como referencia, un agente conversacional omnicanal parte desde US$500 al mes + IVA con 100 conversaciones.'],
];

export const PFAQ = [
  ['¿Tiene costo la implementación?', 'No. En el Agente Conversacional la implementación no tiene costo: pagas solo la mensualidad. En Vendedor IA y en el plan Empresa se define en la propuesta.'],
  ['¿Hay permanencia mínima?', 'No. El Agente Conversacional es un plan mensual y puedes cancelarlo cuando quieras.'],
  ['¿Los precios incluyen IVA?', 'No. Los valores están en dólares (USD) y se les suma IVA.'],
  ['¿Qué necesito para partir?', 'Acceso a tus canales (WhatsApp Business, Instagram, Facebook y tu sitio web) y la información de tu negocio: productos, precios, políticas y preguntas frecuentes.'],
  ['¿Puedo pasar de un plan a otro?', 'Sí. Puedes partir con el Agente Conversacional y pasar a Vendedor IA cuando quieras calificar, cotizar y hacer seguimiento automático.'],
  ['¿Por qué Vendedor IA no tiene precio publicado?', 'Porque depende de cuántos canales, conversaciones e integraciones necesitas. Lo cotizamos en la evaluación gratuita, sin compromiso.'],
];

// Páginas que el agente puede mostrar al visitante (clave -> ruta y nombre).
export const PAGES = {
  inicio: { path: '/', name: 'Inicio' },
  'vendedor-ia': { path: '/vendedor-ia', name: 'Vendedor IA' },
  soluciones: { path: '/soluciones', name: 'Soluciones' },
  ...Object.fromEntries(SOLUTIONS.map((s) => [s.key, { path: s.path, name: s.name }])),
  industrias: { path: '/industrias', name: 'Industrias' },
  precios: { path: '/precios', name: 'Precios' },
  contacto: { path: '/contacto', name: 'Contacto' },
};
