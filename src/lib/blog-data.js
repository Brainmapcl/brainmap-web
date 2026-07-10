/* ════════════════════════════════════════════════════════════════
   blog-data.js — Brainmap Blog: capa de datos, WordPress headless
   ────────────────────────────────────────────────────────────────
   Fuente única de datos del blog. Todos los componentes (blog.jsx,
   blog-post.jsx, BlogApp.jsx, BlogPostApp.jsx) y las páginas Astro
   (blog/index.astro, blog/[slug].astro) consumen exclusivamente las
   funciones exportadas aquí.

   SSG completo: fetchPosts/fetchPostBySlug/fetchCategories/
   fetchRelatedPosts se llaman en build-time (frontmatter de .astro,
   getStaticPaths) — nunca desde un componente cliente. No hay fetch
   en el navegador ni dependencia de CORS en runtime: WordPress solo
   necesita ser alcanzable durante `npm run build`.

   Backend: WordPress headless en https://admin.brainmap.cl, vía su
   REST API nativa (wp-json/wp/v2) — sin plugins adicionales.
   ══════════════════════════════════════════════════════════════ */

/* ── Config ──────────────────────────────────────────────── */
export const WP_CONFIG = {
  API_BASE: 'https://admin.brainmap.cl/wp-json/wp/v2',
  POSTS_PER_PAGE: 6,
  USE_LIVE_API: true,
};

/* ── Taxonomía: refleja los 3 pilares de servicio + un cajón
      editorial adicional. Se mantiene fija (no se lee de
      /categories de WP) para que el filtro del blog quede atado
      a la estructura de negocio, no a lo que un editor cree en WP
      — los conteos por categoría sí se calculan sobre los posts
      reales. En WordPress, las categorías deben crearse con estos
      slugs exactos para que el filtro las reconozca. ── */
export const CATEGORIES = [
  { slug: 'hiperautomatizacion',   name: 'Hiperautomatización',        wpId: null },
  { slug: 'alfabetizacion-ia',     name: 'Alfabetización IA',          wpId: null },
  { slug: 'experiencia-clientes',  name: 'Experiencia de Clientes',    wpId: null },
  { slug: 'casos-de-estudio',      name: 'Casos de Estudio',           wpId: null },
];

/* ── Utilidades de texto ─────────────────────────────────── */
function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/* WP entrega title.rendered / excerpt.rendered con entidades HTML
   (&#8217;, &amp;, etc.) — se decodifican a mano porque esto corre
   en build-time (Node), sin DOM disponible. Cubre las entidades
   numéricas (decimal y hex) y las nombradas más comunes. */
const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decodeEntities(str) {
  return (str || '')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => NAMED_ENTITIES[name]);
}

function cleanText(html) {
  return decodeEntities(stripHtml(html));
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

/* ── Normalización: WP -> modelo interno. Misma forma de salida
      que consumen todos los componentes de UI, sin importar que
      el dato venga de la REST API real. ── */
function normalizeWpPost(wp) {
  const media = wp._embedded && wp._embedded['wp:featuredmedia'] && wp._embedded['wp:featuredmedia'][0];
  const authorWp = wp._embedded && wp._embedded.author && wp._embedded.author[0];
  const termWp = wp._embedded && wp._embedded['wp:term'] && wp._embedded['wp:term'][0] && wp._embedded['wp:term'][0][0];
  const contentHtml = wp.content.rendered;

  return {
    id: wp.id,
    slug: wp.slug,
    title: cleanText(wp.title.rendered),
    excerpt: cleanText(wp.excerpt.rendered),
    contentHtml,
    date: wp.date,
    dateDisplay: formatDateEs(wp.date),
    category: termWp
      ? { slug: termWp.slug, name: termWp.name, wpId: termWp.id }
      : { slug: '', name: '' },
    author: authorWp
      ? { name: authorWp.name, avatar: authorWp.avatar_urls && authorWp.avatar_urls['96'], title: '', bio: authorWp.description }
      : { name: 'Equipo brainmap', avatar: '' },
    featuredImage: media
      ? {
          url: media.source_url,
          alt: media.alt_text || '',
          width: media.media_details && media.media_details.width,
          height: media.media_details && media.media_details.height,
        }
      : null,
    readingTimeMin: computeReadingTime(contentHtml),
  };
}

/* ── Fetch de TODOS los posts de WP, paginando de a 100 (el máximo
      que acepta per_page en la REST API — pasar un número mayor
      falla con 400, por eso no se usa un perPage arbitrariamente
      grande como antes del mock). Se cachea en memoria por proceso
      de build: index.astro y blog/[slug].astro (getStaticPaths)
      llaman a fetchPosts/fetchPostBySlug independientemente, y no
      queremos golpear la API de WP más de una vez por build. ── */
let _allPostsCache = null;

async function fetchAllWpPosts() {
  const perPage = 100;
  const results = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${WP_CONFIG.API_BASE}/posts?_embed&per_page=${perPage}&page=${page}`);
    if (!res.ok) {
      // WP responde 400 "rest_post_invalid_page_number" al pasarse del total de páginas.
      if (res.status === 400 && page > 1) break;
      throw new Error(`WordPress fetchPosts falló: HTTP ${res.status} en ${WP_CONFIG.API_BASE}/posts`);
    }
    const batch = await res.json();
    results.push(...batch.map(normalizeWpPost));
    const totalPages = Number(res.headers.get('X-WP-TotalPages')) || 1;
    if (page >= totalPages || batch.length === 0) break;
    page++;
  }
  return results;
}

async function getAllPosts() {
  if (_allPostsCache) return _allPostsCache;
  const list = WP_CONFIG.USE_LIVE_API ? await fetchAllWpPosts() : [];
  _allPostsCache = list.sort((a, b) => new Date(b.date) - new Date(a.date));
  return _allPostsCache;
}

/* ── API pública consumida por páginas .astro (build-time) ── */

export async function fetchPosts({ page = 1, perPage = WP_CONFIG.POSTS_PER_PAGE, categorySlug = null } = {}) {
  let list = await getAllPosts();
  if (categorySlug) list = list.filter(p => p.category.slug === categorySlug);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = list.slice(start, start + perPage);
  return { items, total, totalPages, page };
}

export async function fetchPostBySlug(slug) {
  const list = await getAllPosts();
  return list.find(p => p.slug === slug) || null;
}

export async function fetchCategories() {
  const list = await getAllPosts();
  return CATEGORIES.map(c => ({ ...c, count: list.filter(p => p.category.slug === c.slug).length }));
}

export async function fetchRelatedPosts(post, limit = 3) {
  const list = await getAllPosts();
  return list.filter(p => p.slug !== post.slug && p.category.slug === post.category.slug).slice(0, limit);
}

export { formatDateEs, computeReadingTime, stripHtml };
