/* ─────────────────────────────────────────────────────────────
   blog.jsx — Componentes compartidos del Blog (listado +
   piezas reutilizadas en el detalle: PostCard, CategoryFilterBar).
   Depende de shared.jsx (useReveal, revStyle, useViewport)
   y de lib/blog-data.js.
   ───────────────────────────────────────────────────────────── */
import { useState } from 'react';
import { useReveal, revStyle, useViewport } from './shared.jsx';

export const BLOG_HOME = '/blog';
export function postUrl(slug) { return `/blog/${encodeURIComponent(slug)}`; }

/* ══════════════════════════════════════════════════════════
   HERO — cabecera editorial del blog
══════════════════════════════════════════════════════════ */
export function BlogHero() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section style={{
      padding: isMobile ? '128px 24px 48px' : '160px 56px 64px',
      background:'var(--color-canvas)', position:'relative', overflow:'hidden', zIndex:1,
    }}>
      <div style={{
        position:'absolute', top:-120, right:-120, width:420, height:420, borderRadius:'50%',
        background:'radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 68%)',
        pointerEvents:'none',
      }} />
      <div ref={ref} style={{
        maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1,
        display:'flex', flexDirection:'column', gap: isMobile ? 16 : 20, ...revStyle(vis),
      }}>
        <span style={{
          fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
          letterSpacing:'.08em', textTransform:'uppercase',
          color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
          border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
          width:'fit-content',
        }}>Blog</span>

        <h1 style={{
          fontFamily:'var(--font-display)',
          fontSize: isMobile ? 'clamp(30px,9vw,40px)' : 'clamp(42px,4.2vw,58px)', fontWeight:700,
          letterSpacing:'-0.04em', lineHeight:1.12,
          color:'var(--color-text-primary)', margin:0, maxWidth: isMobile ? '100%' : 760, textWrap:'pretty',
        }}>
          Ideas sobre orquestación, automatización y experiencia de clientes.
        </h1>

        <p style={{
          fontFamily:'var(--font-subtitle)', fontSize: isMobile ? 15.5 : 18, fontWeight:500,
          letterSpacing:'-0.01em', lineHeight:1.55,
          color:'var(--color-text-secondary)', margin:0, maxWidth: isMobile ? '100%' : 560,
        }}>
          Notas de nuestros consultores sobre lo que realmente mueve la aguja en automatización y CX — sin teoría genérica.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CATEGORY FILTER
══════════════════════════════════════════════════════════ */
export function CategoryFilterBar({ categories, active, onChange }) {
  const { isMobile } = useViewport();
  const pill = (label, slug, count) => {
    const isActive = active === slug;
    return (
      <button key={slug === null ? 'all' : slug} onClick={() => onChange(slug)} style={{
        fontFamily:'var(--font-body)', fontSize:13.5, fontWeight:500,
        color: isActive ? '#fff' : 'var(--color-text-secondary)',
        background: isActive ? 'var(--color-text-primary)' : 'var(--color-canvas)',
        border:'1px solid ' + (isActive ? 'var(--color-text-primary)' : 'var(--color-border)'),
        borderRadius:'var(--radius-full)', padding:'9px 18px', cursor:'pointer',
        boxShadow: isActive ? 'none' : 'var(--shadow-neumorph-xs)',
        transition:'all .2s ease', whiteSpace:'nowrap', flexShrink:0,
        display:'flex', alignItems:'center', gap:7,
      }}>
        {label}
        {typeof count === 'number' && (
          <span style={{
            fontSize:11, opacity: isActive ? .75 : .55,
          }}>{count}</span>
        )}
      </button>
    );
  };
  return (
    <div style={{
      display:'flex', gap:10, flexWrap: isMobile ? 'nowrap' : 'wrap',
      overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? 4 : 0,
      marginBottom: isMobile ? 28 : 40, WebkitOverflowScrolling:'touch',
    }}>
      {pill('Todos', null)}
      {categories.map(c => pill(c.name, c.slug, c.count))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   POST CARD — variantes: default (grid) y featured (destacado)
══════════════════════════════════════════════════════════ */
export function PostImage({ post, height }) {
  if (post.featuredImage && post.featuredImage.url) {
    return (
      <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title}
        width={post.featuredImage.width} height={post.featuredImage.height} loading="lazy" style={{
        width:'100%', height, objectFit:'cover', display:'block',
      }} />
    );
  }
  return (
    <div style={{
      width:'100%', height, display:'flex', alignItems:'center', justifyContent:'center',
      background:'var(--color-accent-subtle)',
    }}>
      <i className="ph-duotone ph-flow-arrow" style={{ fontSize:40, color:'var(--color-accent-intense)', opacity:.6 }} />
    </div>
  );
}

export function MetaRow({ post, light }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      {post.author.avatar && (
        <img src={post.author.avatar} alt={post.author.name} width={24} height={24} loading="lazy" style={{
          width:24, height:24, borderRadius:'50%', objectFit:'cover', flexShrink:0,
        }} />
      )}
      <span style={{
        fontFamily:'var(--font-body)', fontSize:12.5, fontWeight:500,
        color: light ? 'rgba(255,255,255,.85)' : 'var(--color-text-secondary)',
      }}>{post.author.name}</span>
      <span style={{ color: light ? 'rgba(255,255,255,.45)' : 'var(--color-text-muted)', fontSize:12 }}>·</span>
      <span style={{
        fontFamily:'var(--font-body)', fontSize:12.5,
        color: light ? 'rgba(255,255,255,.7)' : 'var(--color-text-muted)',
      }}>{post.dateDisplay}</span>
      <span style={{ color: light ? 'rgba(255,255,255,.45)' : 'var(--color-text-muted)', fontSize:12 }}>·</span>
      <span style={{
        fontFamily:'var(--font-body)', fontSize:12.5,
        color: light ? 'rgba(255,255,255,.7)' : 'var(--color-text-muted)',
      }}>{post.readingTimeMin} min de lectura</span>
    </div>
  );
}

export function CategoryTag({ name, floating }) {
  return (
    <span style={{
      fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
      letterSpacing:'.06em', textTransform:'uppercase',
      color: floating ? '#fff' : 'var(--color-accent-intense)',
      background: floating ? 'rgba(30,30,31,.55)' : 'var(--color-accent-subtle)',
      backdropFilter: floating ? 'blur(8px)' : 'none',
      border: floating ? 'none' : '1px solid var(--color-border-accent)',
      padding:'4px 12px', borderRadius:9999, width:'fit-content',
    }}>{name}</span>
  );
}

export function PostCard({ post, featured }) {
  const { isMobile } = useViewport();
  const [hover, setHover] = useState(false);

  if (featured) {
    return (
      <a href={postUrl(post.slug)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        display:'flex', flexDirection: isMobile ? 'column' : 'row', textDecoration:'none',
        background:'var(--color-canvas-elevated)', borderRadius:'var(--radius-2xl)',
        overflow:'hidden', boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-neumorph)',
        transition:'box-shadow .3s ease, transform .3s ease',
        transform: hover ? 'translateY(-3px)' : 'none', marginBottom: isMobile ? 24 : 40,
      }}>
        <div style={{ flex: isMobile ? 'none' : '0 0 52%', position:'relative' }}>
          <PostImage post={post} height={isMobile ? 220 : '100%'} />
          <div style={{ position:'absolute', top:18, left:18 }}>
            <CategoryTag name={post.category.name} floating />
          </div>
        </div>
        <div style={{
          flex:1, padding: isMobile ? '26px' : '44px', display:'flex', flexDirection:'column',
          gap: isMobile ? 14 : 18, justifyContent:'center',
        }}>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-text-muted)',
          }}>Artículo destacado</span>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(22px,6.5vw,26px)' : 'clamp(24px,2.6vw,34px)',
            fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.2,
            color:'var(--color-text-primary)', margin:0, textWrap:'pretty',
          }}>{post.title}</h2>
          <p className="bm-clamp-3" style={{
            fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.65,
            color:'var(--color-text-secondary)', margin:0,
          }}>{post.excerpt}</p>
          <MetaRow post={post} />
        </div>
      </a>
    );
  }

  return (
    <a href={postUrl(post.slug)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display:'flex', flexDirection:'column', textDecoration:'none',
      background:'var(--color-canvas-elevated)', borderRadius:'var(--radius-2xl)',
      overflow:'hidden', boxShadow: hover ? 'var(--shadow-neumorph-lg)' : 'var(--shadow-neumorph)',
      transition:'box-shadow .3s ease, transform .3s ease',
      transform: hover ? 'translateY(-4px)' : 'none', height:'100%',
    }}>
      <div style={{ position:'relative' }}>
        <PostImage post={post} height={188} />
        <div style={{ position:'absolute', top:14, left:14 }}>
          <CategoryTag name={post.category.name} floating />
        </div>
      </div>
      <div style={{ padding:'22px', display:'flex', flexDirection:'column', gap:12, flex:1 }}>
        <h3 style={{
          fontFamily:'var(--font-subtitle)', fontSize:18, fontWeight:600,
          letterSpacing:'-0.015em', lineHeight:1.32,
          color:'var(--color-text-primary)', margin:0,
        }} className="bm-clamp-2">{post.title}</h3>
        <p className="bm-clamp-2" style={{
          fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.6,
          color:'var(--color-text-secondary)', margin:0, flex:1,
        }}>{post.excerpt}</p>
        <div style={{ marginTop:6 }}><MetaRow post={post} /></div>
      </div>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════
   EMPTY STATE
══════════════════════════════════════════════════════════ */
export function EmptyState({ message }) {
  const { isMobile } = useViewport();
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16,
      padding: isMobile ? '48px 24px' : '64px 24px', textAlign:'center',
      background:'var(--color-canvas-subtle)', borderRadius:'var(--radius-2xl)',
    }}>
      <i className="ph-duotone ph-notebook" style={{ fontSize:40, color:'var(--color-text-muted)' }} />
      <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-secondary)', margin:0, maxWidth:420 }}>
        {message || 'Más artículos en camino. Estamos documentando lo que aprendemos en cada proyecto.'}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════ */
export function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const btn = (content, target, disabled, primary) => (
    <button key={content + target} disabled={disabled} onClick={() => onChange(target)} style={{
      minWidth:40, height:40, padding:'0 12px', borderRadius:'var(--radius-full)',
      border:'1px solid ' + (primary ? 'var(--color-text-primary)' : 'var(--color-border)'),
      background: primary ? 'var(--color-text-primary)' : 'var(--color-canvas)',
      color: primary ? '#fff' : disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
      cursor: disabled ? 'default' : 'pointer', fontFamily:'var(--font-body)', fontSize:13.5, fontWeight:500,
      opacity: disabled ? .4 : 1,
    }}>{content}</button>
  );
  return (
    <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:48, flexWrap:'wrap' }}>
      {btn(<i className="ph ph-arrow-left" style={{ fontSize:15 }} />, page - 1, page <= 1)}
      {pages.map(p => btn(p, p, false, p === page))}
      {btn(<i className="ph ph-arrow-right" style={{ fontSize:15 }} />, page + 1, page >= totalPages)}
    </div>
  );
}
