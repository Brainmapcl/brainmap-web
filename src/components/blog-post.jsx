/* ─────────────────────────────────────────────────────────────
   blog-post.jsx — Componentes exclusivos del detalle de
   artículo. Depende de shared.jsx y blog.jsx (CategoryTag,
   PostCard, BLOG_HOME).
   ───────────────────────────────────────────────────────────── */
import { useState } from 'react';
import { useReveal, revStyle, useViewport } from './shared.jsx';
import { CategoryTag, PostCard, BLOG_HOME } from './blog.jsx';

/* ══════════════════════════════════════════════════════════
   BREADCRUMB
══════════════════════════════════════════════════════════ */
function BlogBreadcrumb({ category }) {
  const { isMobile } = useViewport();
  const crumb = (label, href, current) => (
    <a key={label} href={href || undefined} onClick={!href ? e => e.preventDefault() : undefined} style={{
      fontFamily:'var(--font-body)', fontSize:13, fontWeight:500,
      color: current ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
      textDecoration:'none', cursor: href ? 'pointer' : 'default',
    }}>{label}</a>
  );
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:8, marginBottom: isMobile ? 20 : 28,
      flexWrap:'wrap',
    }}>
      {crumb('Blog', BLOG_HOME)}
      <span style={{ color:'var(--color-text-muted)', fontSize:12 }}>/</span>
      {crumb(category.name, null, true)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ARTICLE HEADER — categoría, título, meta, imagen destacada
══════════════════════════════════════════════════════════ */
export function ArticleHeader({ post }) {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <header style={{
      padding: isMobile ? '124px 24px 0' : '156px 56px 0',
      background:'var(--color-canvas)', position:'relative', zIndex:1,
    }}>
      <div ref={ref} style={{ maxWidth:860, margin:'0 auto', ...revStyle(vis) }}>
        <BlogBreadcrumb category={post.category} />
        <CategoryTag name={post.category.name} />
        <h1 style={{
          fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(28px,8.5vw,36px)' : 'clamp(36px,4.4vw,54px)',
          fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.14,
          color:'var(--color-text-primary)', margin: isMobile ? '18px 0 22px' : '22px 0 28px', textWrap:'pretty',
        }}>{post.title}</h1>

        <div style={{
          display:'flex', alignItems:'center', gap:14, paddingBottom: isMobile ? 24 : 32,
          borderBottom:'1px solid var(--color-border)', flexWrap:'wrap',
        }}>
          {post.author.avatar && (
            <img src={post.author.avatar} alt={post.author.name} width={44} height={44} loading="lazy" style={{
              width:44, height:44, borderRadius:'50%', objectFit:'cover', boxShadow:'var(--shadow-neumorph-sm)',
            }} />
          )}
          <div>
            <div style={{ fontFamily:'var(--font-subtitle)', fontSize:14.5, fontWeight:600, color:'var(--color-text-primary)' }}>
              {post.author.name}
            </div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)' }}>
              {post.dateDisplay} · {post.readingTimeMin} min de lectura
            </div>
          </div>
        </div>
      </div>

      {post.featuredImage && post.featuredImage.url && (
        <div style={{ maxWidth:1120, margin: isMobile ? '28px auto 0' : '40px auto 0' }}>
          <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title}
            width={post.featuredImage.width} height={post.featuredImage.height} loading="eager" fetchpriority="high" style={{
            width:'100%', height: isMobile ? 220 : 460, objectFit:'cover',
            borderRadius: isMobile ? 'var(--radius-xl)' : 'var(--radius-2xl)',
            boxShadow:'var(--shadow-lg)', display:'block',
          }} />
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════
   ARTICLE BODY — HTML de WordPress (content.rendered) inyectado
   tal cual dentro de .wp-content (estilos globales en el <head>
   del .dc.html, no en JSX, porque el HTML es de forma libre).
══════════════════════════════════════════════════════════ */
export function ArticleBody({ html }) {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section style={{ padding: isMobile ? '36px 24px 0' : '48px 56px 0', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div ref={ref} className="wp-content" style={{ maxWidth:760, margin:'0 auto', ...revStyle(vis) }}
        dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SHARE BAR
══════════════════════════════════════════════════════════ */
export function ShareBar({ post }) {
  const { isMobile } = useViewport();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  function copyLink() {
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const shareIcon = (icon, label, href, onClick) => (
    <a key={label} href={href} onClick={onClick} target={href ? '_blank' : undefined} rel="noreferrer" title={label} style={{
      width:38, height:38, borderRadius:'50%', background:'var(--color-canvas)',
      boxShadow:'var(--shadow-neumorph-sm)', display:'flex', alignItems:'center', justifyContent:'center',
      cursor:'pointer', color:'var(--color-text-secondary)', textDecoration:'none',
      transition:'box-shadow .2s ease',
    }}
      onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-neumorph)'}
      onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow-neumorph-sm)'}>
      <i className={icon} style={{ fontSize:16 }} />
    </a>
  );

  return (
    <section style={{ padding: isMobile ? '32px 24px' : '40px 56px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{
        maxWidth:760, margin:'0 auto', display:'flex', alignItems:'center', gap:14,
        paddingTop:24, borderTop:'1px solid var(--color-border)', flexWrap:'wrap',
      }}>
        <span style={{ fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, color:'var(--color-text-muted)' }}>
          Compartir
        </span>
        {shareIcon('ph ph-linkedin-logo', 'LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)}
        {shareIcon('ph ph-x-logo', 'X', `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`)}
        {shareIcon('ph ph-whatsapp-logo', 'WhatsApp', `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + url)}`)}
        {shareIcon(copied ? 'ph ph-check' : 'ph ph-link', copied ? 'Copiado' : 'Copiar enlace', undefined, e => { e.preventDefault(); copyLink(); })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   AUTHOR BIO CARD
══════════════════════════════════════════════════════════ */
export function AuthorBioCard({ author }) {
  const { isMobile } = useViewport();
  return (
    <section style={{ padding: isMobile ? '0 24px 8px' : '0 56px 8px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{
        maxWidth:760, margin:'0 auto', background:'var(--color-canvas-subtle)',
        borderRadius:'var(--radius-2xl)', padding: isMobile ? '24px' : '32px',
        display:'flex', gap:20, alignItems:'flex-start', flexDirection: isMobile ? 'column' : 'row',
      }}>
        {author.avatar && (
          <img src={author.avatar} alt={author.name} width={64} height={64} loading="lazy" style={{
            width:64, height:64, borderRadius:'50%', objectFit:'cover', flexShrink:0,
            boxShadow:'var(--shadow-neumorph-sm)',
          }} />
        )}
        <div>
          <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-text-muted)' }}>
            Escrito por
          </span>
          <h3 style={{
            fontFamily:'var(--font-subtitle)', fontSize:18, fontWeight:600, letterSpacing:'-0.015em',
            color:'var(--color-text-primary)', margin:'6px 0 2px',
          }}>{author.name}</h3>
          {author.title && (
            <p style={{ fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, color:'var(--color-rose-gold)', margin:'0 0 10px' }}>
              {author.title}
            </p>
          )}
          {author.bio && (
            <p style={{ fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.6, color:'var(--color-text-secondary)', margin:0 }}>
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   RELATED POSTS
══════════════════════════════════════════════════════════ */
export function RelatedPostsSection({ posts }) {
  const { isMobile, width } = useViewport();
  const cols = width <= 720 ? '1fr' : width <= 1024 ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
  return (
    <section style={{ padding: isMobile ? '56px 24px' : '88px 56px', background:'var(--color-canvas-subtle)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1120, margin:'0 auto' }}>
        <h2 style={{
          fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(22px,6.5vw,26px)' : 'clamp(26px,2.8vw,34px)',
          fontWeight:700, letterSpacing:'-0.032em', color:'var(--color-text-primary)', margin:'0 0 28px',
        }}>Sigue leyendo</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols, gap:24 }}>
          {posts.map(p => <PostCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   NOT FOUND
══════════════════════════════════════════════════════════ */
export function PostNotFound() {
  const { isMobile } = useViewport();
  return (
    <section style={{
      padding: isMobile ? '160px 24px 96px' : '200px 56px 128px', textAlign:'center',
      background:'var(--color-canvas)', position:'relative', zIndex:1,
    }}>
      <i className="ph-duotone ph-magnifying-glass" style={{ fontSize:48, color:'var(--color-text-muted)' }} />
      <h1 style={{
        fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,36px)', fontWeight:700,
        letterSpacing:'-0.03em', color:'var(--color-text-primary)', margin:'20px 0 12px',
      }}>Artículo no encontrado</h1>
      <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-secondary)', margin:'0 0 28px' }}>
        Puede que el enlace esté roto o el artículo ya no esté disponible.
      </p>
      <a href={BLOG_HOME} style={{
        fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'#fff',
        background:'var(--color-text-primary)', borderRadius:'var(--radius-full)',
        padding:'13px 28px', textDecoration:'none', display:'inline-block',
      }}>Volver al blog</a>
    </section>
  );
}
