/* ════════════════════════════════════════════════════════════════
   blog-data.js — Brainmap Blog: capa de datos + contrato WordPress
   ────────────────────────────────────────────────────────────────
   Este archivo es la ÚNICA fuente de datos del blog. Todos los
   componentes (blog.jsx, blog-post.jsx, BlogApp.jsx,
   BlogPostApp.jsx) consumen exclusivamente las funciones
   exportadas aquí — nunca leen POSTS directamente.

   Esto es intencional: el día que el sitio se monte sobre WordPress,
   sólo hay que reescribir el CUERPO de las funciones fetchPosts /
   fetchPostBySlug / fetchCategories para que llamen a la REST API
   de WP en vez de leer el arreglo local. Ningún componente de UI
   necesita cambiar — todos ya trabajan con "await fetchX()".

   ══════════════════════════════════════════════════════════════
   GUÍA DE INTEGRACIÓN CON WORDPRESS (para Claude Code / dev)
   ══════════════════════════════════════════════════════════════

   1) Backend recomendado
      - WordPress "headless" o clásico, exponiendo la REST API nativa
        (wp-json/wp/v2) — no requiere plugins adicionales.
      - Define WP_CONFIG.API_BASE abajo con la URL real, p.ej.
        'https://blog.brainmap.cl/wp-json/wp/v2'.

   2) Listado de artículos → GET {API_BASE}/posts
      Parámetros útiles:
        ?_embed                      incluye autor + imagen destacada + términos
        &per_page=6&page=1           paginación (WP_CONFIG.POSTS_PER_PAGE)
        &categories={id}             filtrar por categoría (usar el ID numérico,
                                      no el slug — mapear con fetchCategories)
        &orderby=date&order=desc     orden descendente por fecha (default de WP)
      La respuesta trae el total de páginas en el header
      'X-WP-TotalPages' (fetch(...).then(r => r.headers.get('X-WP-TotalPages'))).

   3) Detalle de artículo → GET {API_BASE}/posts?slug={slug}&_embed
      WP no tiene "get by slug" directo; se filtra por query param y
      se toma results[0].

   4) Categorías → GET {API_BASE}/categories
      Usar para poblar CATEGORIES dinámicamente (id, slug, name, count).

   5) Mapeo de campos WP → modelo interno (ver normalizeWpPost() abajo,
      dejada lista para activar apenas haya API real):
        id                 -> wp.id
        slug               -> wp.slug
        title              -> wp.title.rendered
        excerpt             -> stripHtml(wp.excerpt.rendered)
        contentHtml         -> wp.content.rendered   (se inyecta tal cual en
                               el contenedor .wp-content — por eso esa clase
                               ya trae estilos para p/h2/h3/ul/blockquote/img)
        date                -> wp.date (ISO)
        category            -> wp._embedded['wp:term'][0][0]  (nombre/slug)
        author.name         -> wp._embedded.author[0].name
        author.avatar       -> wp._embedded.author[0].avatar_urls['96']
        author.bio          -> wp._embedded.author[0].description
        featuredImage.url   -> wp._embedded['wp:featuredmedia'][0].source_url
        featuredImage.alt   -> wp._embedded['wp:featuredmedia'][0].alt_text
        readingTimeMin      -> no existe en WP; se calcula localmente con
                               computeReadingTime() sobre el texto plano
                               (o expón un custom field/ACF "tiempo_lectura"
                               si prefieres que lo defina el editor).

   6) Rutas / permalinks en producción
      Este prototipo simula las páginas con archivos planos:
        - listado:  Brainmap Blog.dc.html
        - detalle:  Brainmap Blog Detalle.dc.html?post={slug}
      En WordPress esas dos vistas se vuelven los templates estándar
      del tema (archive.php / template-blog.php para el listado,
      single.php para el detalle), y el slug llega por la URL real
      (/blog/{slug}/) vía get_query_var('post') o el post actual del
      Loop — ya no por query string. El query param ?post= de acá es
      solo un stand-in de prototipo.

   7) CORS
      Si el WordPress vive en un subdominio distinto al del sitio
      (p.ej. blog.brainmap.cl vs www.brainmap.cl), habilita CORS en
      WP (header Access-Control-Allow-Origin) o sirve la API vía
      proxy/reverse-proxy del mismo dominio.

   8) Automatización de publicación
      Como se consume la REST API estándar, cualquier automatización
      (Zapier, Make, n8n, o un script propio) que cree posts vía
      POST {API_BASE}/posts (con autenticación por Application
      Password o JWT) aparece en el sitio sin tocar código front-end.
   ══════════════════════════════════════════════════════════════ */

import { DS_BASE } from './constants.js';

/* ── Config: único lugar a tocar al conectar WordPress real ── */
export const WP_CONFIG = {
  API_BASE: 'https://blog.brainmap.cl/wp-json/wp/v2', // TODO: reemplazar por el dominio real
  POSTS_PER_PAGE: 6,
  USE_LIVE_API: false, // pásalo a true cuando actives las llamadas fetch() reales de abajo
};

/* ── Taxonomía: refleja los 3 pilares de servicio + un cajón
      editorial adicional. En WP esto vendría de /categories. ── */
export const CATEGORIES = [
  { slug: 'hiperautomatizacion',   name: 'Hiperautomatización',        wpId: null },
  { slug: 'alfabetizacion-ia',     name: 'Alfabetización IA',          wpId: null },
  { slug: 'experiencia-clientes',  name: 'Experiencia de Clientes',    wpId: null },
  { slug: 'casos-de-estudio',      name: 'Casos de Estudio',           wpId: null },
];

/* ── Autores: en WP vendría de _embedded.author[0] ── */
const AUTHORS = {
  'rodrigo-gonzalez': {
    name: 'Rodrigo González',
    title: 'Ingeniero Comercial · Diseño de Servicios',
    avatar: '/assets/team-rodrigo.webp',
    avatarWidth: 1600,
    avatarHeight: 1600,
    bio: 'Lidera implementación de productos y servicios, diseño de experiencia de clientes y arquitectura tecnológica en brainmap. Experto en inteligencia artificial aplicada a procesos.',
  },
  'ivan-gaete': {
    name: 'Iván Gaete',
    title: 'Relacionador Público · Estrategia CX',
    avatar: '/assets/team-ivan.webp',
    avatarWidth: 2048,
    avatarHeight: 2048,
    bio: 'Especialista en transformación digital, gestión de cultura centrada en el cliente y adopción de inteligencia artificial en equipos.',
  },
};

/* ── Artículos ─────────────────────────────────────────────
   Esta es la ÚNICA sección con contenido real. Se deja UN
   artículo de muestra para validar diseño y tipografía; el
   resto del listado se resuelve con el EmptyState hasta que
   existan posts reales en WordPress. Los nuevos posts (reales
   o vía WP) siempre deben llevar fecha ISO — el orden
   descendente se recalcula solo. ── */
const POSTS = [
  {
    id: 1,
    slug: 'automatizacion-no-falla-por-tecnologia',
    title: 'La automatización no falla por tecnología. Falla por orquestación.',
    excerpt: 'Instalar un CRM, un bot o un RPA no resuelve la fricción de tus clientes. La resuelve el diseño de cómo esos sistemas conversan entre sí. Esto es lo que vemos, proyecto tras proyecto.',
    categorySlug: 'hiperautomatizacion',
    authorKey: 'rodrigo-gonzalez',
    date: '2026-06-24T09:00:00-04:00',
    featuredImage: {
      url: `${DS_BASE}/assets/imagery/texture-arch-warm.webp`,
      alt: 'Estructura arquitectónica blanca y curva, luz cálida — metáfora de sistemas bien orquestados',
      width: 8064,
      height: 5376,
    },
    contentHtml: `
      <p>Casi todas las empresas con las que conversamos ya compraron algo: un CRM nuevo, un bot de WhatsApp, un RPA para conciliar facturas. Y casi todas llegan a nosotros con la misma frase: <strong>"lo implementamos, pero el cliente lo sigue notando."</strong></p>

      <p>El problema casi nunca es la herramienta. Es que cada sistema fue instalado para resolver un dolor puntual de un área puntual — ventas, cobranza, soporte — sin que nadie diseñara cómo esos sistemas debían hablar entre sí, ni qué pasaba con el cliente en las costuras. Ahí es donde se pierde la promesa.</p>

      <h2>El síntoma no es el sistema, es la costura</h2>
      <p>Un cliente escribe por WhatsApp, lo atiende un bot, después lo deriva a un ejecutivo que no ve el historial, y ese ejecutivo abre un CRM que no conversa con el sistema de facturación. Cada pieza, vista por separado, funciona. Junta, produce exactamente la fricción que la empresa quería eliminar.</p>

      <blockquote>Nuestra propuesta de valor es profunda, no superficial. Tus clientes no se van por precio. Se van por una mala orquestación.</blockquote>

      <h2>Tres señales de que tu operación está fragmentada, no orquestada</h2>
      <ul>
        <li><strong>Reprocesos invisibles:</strong> tus equipos copian y pegan datos entre sistemas que "deberían" estar integrados.</li>
        <li><strong>Contexto perdido:</strong> el cliente repite su problema en cada canal porque ningún sistema conserva la conversación completa.</li>
        <li><strong>Automatización de silo:</strong> cada área automatizó su propio dolor, pero nadie diseñó el viaje completo de punta a punta.</li>
      </ul>

      <p>Nuestra metodología parte siempre por un diagnóstico de orquestación antes de tocar una sola herramienta: mapeamos el viaje real del cliente a través de los sistemas — no el viaje ideal del slide de ventas — y ahí aparecen las costuras rotas. Recién con ese mapa diseñamos la infraestructura: qué automatizamos, qué integramos y qué eliminamos.</p>

      <h2>Diseñar antes de automatizar</h2>
      <p>La hiperautomatización bien hecha no añade más software. Reduce la cantidad de sistemas que un cliente — o un colaborador — tiene que atravesar para obtener una respuesta. Ese es el estándar con el que medimos cada proyecto: menos pasos, menos fricción, cero contexto perdido.</p>
    `,
  },
];

/* ── Utilidades de texto ─────────────────────────────────── */
function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function computeReadingTime(html) {
  const words = stripHtml(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDateEs(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) { return ''; }
}

/* ── Normalización: adjunta autor/categoría/tiempo de lectura.
      Misma forma de salida sin importar si el post vino del
      arreglo local o (en el futuro) de la REST API de WP. ── */
function normalizePost(raw) {
  const category = CATEGORIES.find(c => c.slug === raw.categorySlug) || { slug: raw.categorySlug, name: raw.categorySlug };
  const author = AUTHORS[raw.authorKey] || { name: 'Equipo brainmap', title: '', avatar: '' };
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    contentHtml: raw.contentHtml,
    date: raw.date,
    dateDisplay: formatDateEs(raw.date),
    category,
    author,
    featuredImage: raw.featuredImage,
    readingTimeMin: computeReadingTime(raw.contentHtml),
  };
}

/* Esto es lo que haría normalizeWpPost(wpRawPost) una vez activa
   la API real — misma forma de salida que normalizePost() arriba,
   para que ningún componente deba cambiar:

   function normalizeWpPost(wp) {
     const media = wp._embedded && wp._embedded['wp:featuredmedia'] && wp._embedded['wp:featuredmedia'][0];
     const authorWp = wp._embedded && wp._embedded.author && wp._embedded.author[0];
     const termWp = wp._embedded && wp._embedded['wp:term'] && wp._embedded['wp:term'][0] && wp._embedded['wp:term'][0][0];
     return {
       id: wp.id, slug: wp.slug,
       title: stripHtml(wp.title.rendered),
       excerpt: stripHtml(wp.excerpt.rendered),
       contentHtml: wp.content.rendered,
       date: wp.date,
       dateDisplay: formatDateEs(wp.date),
       category: termWp ? { slug: termWp.slug, name: termWp.name } : { slug:'', name:'' },
       author: authorWp ? { name: authorWp.name, avatar: authorWp.avatar_urls['96'], title:'', bio: authorWp.description } : { name:'brainmap' },
       featuredImage: media ? { url: media.source_url, alt: media.alt_text } : null,
       readingTimeMin: computeReadingTime(wp.content.rendered),
     };
   }
*/

const NORMALIZED = POSTS.map(normalizePost).sort((a, b) => new Date(b.date) - new Date(a.date));

/* ── API pública consumida por los componentes ──────────────
   Todas async / basadas en Promise para que activar
   WP_CONFIG.USE_LIVE_API sólo signifique cambiar el cuerpo. ── */

export async function fetchPosts({ page = 1, perPage = WP_CONFIG.POSTS_PER_PAGE, categorySlug = null } = {}) {
  if (WP_CONFIG.USE_LIVE_API) {
    // const catParam = categorySlug ? `&categories=${await resolveCategoryId(categorySlug)}` : '';
    // const res = await fetch(`${WP_CONFIG.API_BASE}/posts?_embed&per_page=${perPage}&page=${page}${catParam}`);
    // const items = (await res.json()).map(normalizeWpPost);
    // const totalPages = Number(res.headers.get('X-WP-TotalPages')) || 1;
    // return { items, total: Number(res.headers.get('X-WP-Total')) || items.length, totalPages, page };
  }
  let list = NORMALIZED;
  if (categorySlug) list = list.filter(p => p.category.slug === categorySlug);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = list.slice(start, start + perPage);
  return { items, total, totalPages, page };
}

export async function fetchPostBySlug(slug) {
  if (WP_CONFIG.USE_LIVE_API) {
    // const res = await fetch(`${WP_CONFIG.API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`);
    // const arr = await res.json();
    // return arr.length ? normalizeWpPost(arr[0]) : null;
  }
  return NORMALIZED.find(p => p.slug === slug) || null;
}

export async function fetchCategories() {
  if (WP_CONFIG.USE_LIVE_API) {
    // const res = await fetch(`${WP_CONFIG.API_BASE}/categories?per_page=50`);
    // return (await res.json()).map(c => ({ slug: c.slug, name: c.name, wpId: c.id, count: c.count }));
  }
  return CATEGORIES.map(c => ({ ...c, count: NORMALIZED.filter(p => p.category.slug === c.slug).length }));
}

export async function fetchRelatedPosts(post, limit = 3) {
  return NORMALIZED.filter(p => p.slug !== post.slug && p.category.slug === post.category.slug).slice(0, limit);
}

export { formatDateEs, computeReadingTime, stripHtml };
