/* BlogApp.jsx — root composition for the blog listing page (ported from blog-app.jsx) */
import { useState, useEffect } from 'react';
import { NavBar, Footer, ChatOverlay, ContactSection, useViewport, useKarinChat } from './shared.jsx';
import { BlogHero, CategoryFilterBar, PostCard, EmptyState, Pagination } from './blog.jsx';
import { fetchPosts, fetchCategories } from '../lib/blog-data.js';

export default function BlogApp() {
  const { isMobile } = useViewport();
  const chat = useKarinChat();

  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat]   = useState(null);
  const [page, setPage]             = useState(1);
  const [result, setResult]         = useState({ items: [], total: 0, totalPages: 1, page: 1 });
  const [loading, setLoading]       = useState(true);

  useEffect(() => { fetchCategories().then(setCategories); }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPosts({ page, categorySlug: activeCat }).then(res => {
      if (!alive) return;
      setResult(res);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [page, activeCat]);

  function changeCategory(slug) {
    setActiveCat(slug);
    setPage(1);
  }

  function changePage(p) {
    setPage(p);
    const el = document.getElementById('articulos');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  }

  const showFeatured = page === 1 && !activeCat && result.items.length > 0;
  const featured = showFeatured ? result.items[0] : null;
  const rest = showFeatured ? result.items.slice(1) : result.items;
  const cols = isMobile ? '1fr' : 'repeat(3,1fr)';

  return (
    <>
      <NavBar breadcrumb="Blog" />
      <BlogHero />

      <section id="articulos" style={{ padding: isMobile ? '0 24px 72px' : '0 56px 104px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <CategoryFilterBar categories={categories} active={activeCat} onChange={changeCategory} />

          {!loading && featured && <PostCard post={featured} featured />}

          {!loading && rest.length > 0 && (
            <div style={{ display:'grid', gridTemplateColumns: cols, gap:24 }}>
              {rest.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          )}

          {!loading && result.items.length === 0 && (
            <EmptyState message={activeCat ? 'Aún no hay artículos publicados en esta categoría.' : 'Aún no hay artículos publicados. Vuelve pronto.'} />
          )}

          <Pagination page={result.page} totalPages={result.totalPages} onChange={changePage} />
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
