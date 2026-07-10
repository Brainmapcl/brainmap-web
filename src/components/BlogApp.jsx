/* BlogApp.jsx — root composition for the blog listing page.
   SSG completo: `posts` y `categories` llegan ya resueltos desde
   blog/index.astro (fetch en build-time). No hay fetch en el
   navegador — el filtro por categoría y la paginación se resuelven
   en memoria sobre el arreglo ya cargado. */
import { useState, useMemo } from 'react';
import { NavBar, Footer, ChatOverlay, ContactSection, useViewport, useKarinChat } from './shared.jsx';
import { BlogHero, CategoryFilterBar, PostCard, EmptyState, Pagination } from './blog.jsx';

export default function BlogApp({ posts, categories, postsPerPage = 6 }) {
  const { isMobile } = useViewport();
  const chat = useKarinChat();

  const [activeCat, setActiveCat] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = postsPerPage;

  const filtered = useMemo(
    () => (activeCat ? posts.filter(p => p.category.slug === activeCat) : posts),
    [posts, activeCat]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * perPage, page * perPage),
    [filtered, page, perPage]
  );

  function changeCategory(slug) {
    setActiveCat(slug);
    setPage(1);
  }

  function changePage(p) {
    setPage(p);
    const el = document.getElementById('articulos');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  }

  const showFeatured = page === 1 && !activeCat && pageItems.length > 0;
  const featured = showFeatured ? pageItems[0] : null;
  const rest = showFeatured ? pageItems.slice(1) : pageItems;
  const cols = isMobile ? '1fr' : 'repeat(3,1fr)';

  return (
    <>
      <NavBar breadcrumb="Blog" />
      <BlogHero />

      <section id="articulos" style={{ padding: isMobile ? '0 24px 72px' : '0 56px 104px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <CategoryFilterBar categories={categories} active={activeCat} onChange={changeCategory} />

          {featured && <PostCard post={featured} featured />}

          {rest.length > 0 && (
            <div style={{ display:'grid', gridTemplateColumns: cols, gap:24 }}>
              {rest.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          )}

          {pageItems.length === 0 && (
            <EmptyState message={activeCat ? 'Aún no hay artículos publicados en esta categoría.' : 'Aún no hay artículos publicados. Vuelve pronto.'} />
          )}

          <Pagination page={page} totalPages={totalPages} onChange={changePage} />
        </div>
      </section>

      <ContactSection
        chat={chat}
        eyebrow="Hablemos"
        title="¿Un tema que quieras que abordemos?"
        subtitle="Si hay un problema de automatización o experiencia de clientes que te gustaría que analicemos en el blog, cuéntanos."
        bullets={['Diagnóstico gratuito','Propuesta técnica y a la medida','Sin contratos forzosos ni suscripciones']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
