/* soluciones-data.js — contenido de los 4 casos de uso
   Portado del handoff de Claude Design (soluciones-data.js) a un módulo ES.
   Las rutas de imagen apuntan a /public/assets/imagery. */

export const SOLUCIONES_CASES = [
  {
    id:'funnel', icon:'ph-funnel', num:'01', bg:'/assets/imagery/solucion-funnel-bg.webp',
    title:'Funnel de ventas automatizado',
    claim:'Tu equipo comercial deja de entrevistar y empieza a proponer.',
    intro:'Para servicios que requieren un análisis previo: ahórrate la entrevista inicial para entender qué quiere resolver tu cliente o si califica para el servicio que entregas. Un agente comprende la necesidad, te envía un brief con todos los detalles y agenda la cita.',
    steps:[
      { icon:'ph-chat-teardrop-dots', t:'Conversa y comprende', d:'El agente indaga la necesidad real del prospecto con las preguntas que haría tu mejor vendedor.' },
      { icon:'ph-list-checks', t:'Califica', d:'Determina si el caso encaja con lo que entregas antes de ocupar la agenda de tu equipo.' },
      { icon:'ph-file-text', t:'Envía el brief', d:'Tu equipo recibe el contexto completo: necesidad, alcance, urgencia y presupuesto declarado.' },
      { icon:'ph-calendar-check', t:'Agenda la cita', d:'Reserva directo en el calendario del ejecutivo correcto, sin ida y vuelta de correos.' },
    ],
    bullets:[
      'Tu equipo llega con una propuesta concreta desde la primera reunión',
      'No pierdes la oportunidad de hablar con un potencial cliente',
      'Conéctalo a tu web, WhatsApp o el medio de contacto que prefieras',
    ],
    channels:['Sitio web','WhatsApp','Instagram','Formulario','Calendario'],
    cta:'Quiero automatizar mi funnel',
  },
  {
    id:'atencion', icon:'ph-headset', num:'02', bg:'/assets/imagery/solucion-atencion-bg.webp',
    title:'Agente de atención al cliente',
    claim:'No es solo contenido: el agente ejecuta.',
    intro:'Recibes muchas consultas y debes resolver reclamos o solicitudes de quienes ya son tus clientes. Automatizamos la atención de forma conversacional, conectando con tus sistemas para que el agente resuelva de verdad.',
    steps:[
      { icon:'ph-plugs-connected', t:'Conecta tus sistemas', d:'CRM, ERP, inventario, tickets: el agente consulta y escribe donde vive la información real.' },
      { icon:'ph-lightning', t:'Ejecuta tareas', d:'Toma pedidos, actualiza datos, gestiona una solicitud — no solo responde preguntas frecuentes.' },
      { icon:'ph-wrench', t:'Resuelve problemas', d:'Diagnostica el caso, aplica la solución disponible y deja registro del resultado.' },
      { icon:'ph-user-switch', t:'Escala cuando corresponde', d:'Deriva a una persona con todo el contexto cuando el caso lo amerita.' },
    ],
    bullets:[
      'Atención continua en el canal donde ya está tu cliente',
      'El agente actúa sobre tus sistemas, no solo informa',
      'Tono y criterios de tu marca, no respuestas genéricas',
    ],
    channels:['Web','Apps','WhatsApp','Telegram','Llamadas telefónicas'],
    cta:'Quiero un agente de atención',
  },
  {
    id:'cobranza', icon:'ph-receipt', num:'03', bg:'/assets/imagery/solucion-cobranza-bg.webp',
    title:'Agente de cobranza',
    claim:'Cobrar sin desgastar la relación con tu cliente.',
    intro:'Un tema tan delicado como cobrar no es tarea fácil. Orquesta tu base de datos y el agente se encarga del resto: contacta a tus deudores, sondea, entrega alternativas y concreta la transacción.',
    steps:[
      { icon:'ph-database', t:'Orquesta tu base', d:'Segmenta la cartera por antigüedad, monto y comportamiento de pago.' },
      { icon:'ph-phone-call', t:'Contacta y sondea', d:'Abre la conversación con el tono correcto y entiende la situación real del deudor.' },
      { icon:'ph-handshake', t:'Propone acuerdos', d:'Entrega alternativas y acuerdos de pago dentro de las reglas que tú defines.' },
      { icon:'ph-credit-card', t:'Cierra el pago', d:'Conecta con tu propia pasarela de pagos para concretar la transacción en la misma conversación.' },
    ],
    bullets:[
      'Mediciones reales de recupero por segmento y canal',
      'Feedback sobre qué estrategias generan mejores resultados',
      'Trazabilidad completa de cada compromiso de pago',
    ],
    channels:['WhatsApp','Correo','Llamadas','SMS','Pasarela de pagos'],
    cta:'Quiero mejorar mi recaudación',
  },
  {
    id:'proyectos', icon:'ph-kanban', num:'04', bg:'/assets/imagery/solucion-proyectos-bg.webp',
    title:'Agente de seguimiento de proyectos',
    claim:'El tablero al día sin andar detrás de las personas.',
    intro:'Todo negocio que está escalando tiene proyectos que requieren seguimiento y un estatus concreto. Conectamos un agente con tus artefactos de seguimiento — Jira, Trello o el típico Excel — y él se encarga de mantenerlos vivos.',
    steps:[
      { icon:'ph-plugs', t:'Se conecta a tu herramienta', d:'Jira, Trello o la planilla que ya usa tu equipo. No cambias de sistema.' },
      { icon:'ph-bell-ringing', t:'Contacta a los responsables', d:'Pide el avance de cada tarea a quien corresponde, en el momento que corresponde.' },
      { icon:'ph-pencil-simple', t:'Actualiza directo', d:'Escribe el avance en la herramienta, sin pasar por una planilla intermedia.' },
      { icon:'ph-chats-circle', t:'Responde al equipo', d:'Cualquier participante puede preguntar el estado o pedirle actualizar sus tareas.' },
    ],
    bullets:[
      'El jefe de proyecto ve el estado real, siempre actualizado',
      'Menos reuniones dedicadas solo a actualizar el tablero',
      'Cada responsable reporta en la conversación, no en un formulario',
    ],
    channels:['Jira','Trello','Excel / Sheets','WhatsApp','Slack / Teams'],
    cta:'Quiero ordenar mi seguimiento',
  },
];
