/* ─────────────────────────────────────────────────────────────
   nosotros.jsx — Página "Nosotros"
   Ported from nosotros-bundle.jsx (Claude Design handoff) to an
   ES module. Depends on shared.jsx (useReveal, revStyle, useViewport).
   ───────────────────────────────────────────────────────────── */
import { useReveal, revStyle, useViewport } from './shared.jsx';
import { DS_BASE } from '../lib/constants';

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
const DEFAULT_HERO_IMAGE = { src: `${DS_BASE}/assets/imagery/texture-arch-lattice.webp`, width: 8064, height: 5376 };

export function AboutHero({ heroImage = DEFAULT_HERO_IMAGE }) {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section style={{
      padding: isMobile ? '128px 24px 64px' : '160px 56px 96px',
      background:'var(--color-canvas)', position:'relative', overflow:'hidden', zIndex:1,
    }}>
      <img src={heroImage.src} width={heroImage.width} height={heroImage.height} alt="" loading="eager" fetchpriority="high" style={{
        position:'absolute', top:0, right:0, height:'100%', width: isMobile ? '100%' : '46%',
        objectFit:'cover', objectPosition:'center',
        maskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.5) 30%, black 60%)',
        WebkitMaskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.5) 30%, black 60%)',
        opacity: isMobile ? .1 : .16, pointerEvents:'none',
      }} />
      <div ref={ref} style={{
        maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1,
        display:'flex', flexDirection:'column', gap: isMobile ? 18 : 24,
        maxWidth: isMobile ? '100%' : 760, ...revStyle(vis),
      }}>
        <span style={{
          fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
          letterSpacing:'.08em', textTransform:'uppercase',
          color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
          border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
          width:'fit-content',
        }}>Nosotros</span>

        <h1 style={{
          fontFamily:'var(--font-display)',
          fontSize: isMobile ? 'clamp(30px,9vw,40px)' : 'clamp(42px,4.4vw,60px)', fontWeight:700,
          letterSpacing:'-0.04em', lineHeight:1.14,
          color:'var(--color-text-primary)', margin:0, textWrap:'pretty',
        }}>
          Nuestra propuesta de valor es profunda,{' '}
          <span style={{ color:'var(--color-text-accent)' }}>no superficial.</span>
        </h1>

        <p style={{
          fontFamily:'var(--font-subtitle)', fontSize: isMobile ? 15.5 : 18, fontWeight:500,
          letterSpacing:'-0.01em', lineHeight:1.55,
          color:'var(--color-text-secondary)', margin:0, maxWidth:560,
        }}>
          Somos brainmap, una consultora especializada en Ingeniería Empática. Diseñamos y construimos los sistemas que sostienen la experiencia de tus clientes y tus equipos — con trayectoria real detrás de cada recomendación.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CIFRAS / TRAYECTORIA
══════════════════════════════════════════════════════════ */
const DISCIPLINES = [
  'Consultoría de experiencia de clientes',
  'Automatización de procesos',
  'Implementación de bots',
  'Diseño centrado en el usuario',
  'Diseño de sistemas y contenidos para empleados',
];

export function StatsSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section style={{ padding: isMobile ? '56px 24px 72px' : '0 56px 112px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div ref={ref} style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 0,
          background:'var(--color-canvas-subtle)', borderRadius:'var(--radius-2xl)',
          padding: isMobile ? '36px 26px' : '52px 60px', ...revStyle(vis),
        }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8, borderRight: isMobile ? 'none' : '1px solid var(--color-border)', paddingRight: isMobile ? 0 : 40 }}>
            <span style={{
              fontFamily:'var(--font-display)', fontSize: isMobile ? 44 : 60, fontWeight:700,
              letterSpacing:'-0.03em', color:'var(--color-text-primary)', lineHeight:1,
            }}>+10</span>
            <span style={{ fontFamily:'var(--font-body)', fontSize:14.5, lineHeight:1.5, color:'var(--color-text-secondary)', maxWidth:280 }}>
              años de experiencia liderando proyectos de experiencia de clientes, automatización y diseño centrado en el usuario.
            </span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, paddingLeft: isMobile ? 0 : 40 }}>
            <span style={{
              fontFamily:'var(--font-display)', fontSize: isMobile ? 44 : 60, fontWeight:700,
              letterSpacing:'-0.03em', color:'var(--color-text-primary)', lineHeight:1,
            }}>+50</span>
            <span style={{ fontFamily:'var(--font-body)', fontSize:14.5, lineHeight:1.5, color:'var(--color-text-secondary)', maxWidth:280 }}>
              proyectos entregados con resultados medibles, desde el diseño de la experiencia hasta la implementación en venta, postventa y procesos.
            </span>
          </div>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', marginTop: isMobile ? 28 : 36 }}>
          {DISCIPLINES.map((d, i) => (
            <span key={i} style={{
              fontFamily:'var(--font-body)', fontSize:13, fontWeight:500,
              color:'var(--color-text-secondary)', background:'var(--color-canvas)',
              border:'1px solid var(--color-border)', borderRadius:9999, padding:'8px 16px',
            }}>{d}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   EQUIPO
══════════════════════════════════════════════════════════ */
const TEAM = [
  {
    photo:'/assets/team-rodrigo.webp',
    name:'Rodrigo González',
    title:'Ingeniero Comercial — Diplomado en Diseño de Servicios',
    bio:'Amplia experiencia liderando proyectos de implementación de productos y servicios, diseño de experiencia de clientes, arquitectura tecnológica y metodologías ágiles. Experto en inteligencia artificial.',
  },
  {
    photo:'/assets/team-ivan.webp',
    name:'Iván Gaete',
    title:'Relacionador Público — Magíster en Comunicación, Marketing y Nuevos Negocios',
    bio:'Amplia experiencia en transformación digital, diseño de productos y servicios, gestión de proyectos tecnológicos y metodologías de innovación. Experto en inteligencia artificial, coach organizacional y gestión de cultura centrada en el cliente.',
  },
];

export function TeamSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile, width } = useViewport();
  const cols = width <= 720 ? '1fr' : 'repeat(2,1fr)';
  return (
    <section style={{ padding: isMobile ? '0 24px 72px' : '0 56px 112px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div ref={ref} style={{ marginBottom: isMobile ? 32 : 48, ...revStyle(vis) }}>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-text-muted)',
          }}>Co-founders</span>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(30px,3vw,42px)',
            fontWeight:700, letterSpacing:'-0.032em', lineHeight:1.16,
            color:'var(--color-text-primary)', margin:'14px 0 0',
          }}>Quienes responden por cada proyecto</h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: cols, gap:24 }}>
          {TEAM.map((m, i) => {
            const [cRef, cVis] = useReveal(i * 110);
            return (
              <div key={i} ref={cRef} style={{
                background:'var(--color-canvas-subtle)', borderRadius:'var(--radius-2xl)',
                padding: isMobile ? '26px' : '32px', display:'flex', flexDirection:'column', gap:20,
                boxShadow:'var(--shadow-sm)', ...revStyle(cVis),
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <img src={m.photo} alt={m.name} width={76} height={76} loading="lazy" style={{
                    width:76, height:76, borderRadius:'50%', objectFit:'cover', flexShrink:0,
                    boxShadow:'var(--shadow-neumorph-sm)',
                  }} />
                  <div>
                    <h3 style={{
                      fontFamily:'var(--font-subtitle)', fontSize:19, fontWeight:600,
                      letterSpacing:'-0.015em', color:'var(--color-text-primary)', margin:0,
                    }}>{m.name}</h3>
                    <p style={{
                      fontFamily:'var(--font-body)', fontSize:13, fontWeight:500,
                      color:'var(--color-rose-gold)', margin:'4px 0 0', lineHeight:1.4,
                    }}>{m.title}</p>
                  </div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14.5, lineHeight:1.65, color:'var(--color-text-secondary)', margin:0 }}>{m.bio}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
