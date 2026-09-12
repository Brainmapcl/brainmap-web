/* ─────────────────────────────────────────────────────────────
   soluciones.jsx — Página "Soluciones existentes"
   Portado de soluciones-bundle.jsx + soluciones-cases.jsx
   (handoff de Claude Design) a módulos ES consumidos como
   islas de Astro/React. Enlaces reescritos a rutas Astro.
   ───────────────────────────────────────────────────────────── */
import { useReveal, revStyle, useViewport, goTo } from './shared.jsx';
import { SOLUCIONES_CASES as CASES } from '../lib/soluciones-data.js';

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
export function SolucionesHero() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section style={{ padding: isMobile ? '124px 24px 56px' : '176px 56px 72px', background:'var(--color-canvas)' }}>
      <div ref={ref} style={{ maxWidth:1280, margin:'0 auto', ...revStyle(vis) }}>
        <span style={{
          fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
          letterSpacing:'.08em', textTransform:'uppercase',
          color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
          border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
        }}>Listas para adoptar</span>
        <h1 style={{
          fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(32px,9vw,42px)' : 'clamp(44px,4.6vw,68px)',
          fontWeight:700, letterSpacing:'-0.038em', lineHeight:1.06,
          color:'var(--color-text-primary)', margin:'22px 0 0', maxWidth:940, textWrap:'balance',
        }}>Soluciones existentes que tu empresa puede adoptar ahora</h1>
        <p style={{
          fontFamily:'var(--font-body)', fontSize: isMobile ? 16 : 18.5, lineHeight:1.6,
          color:'var(--color-text-secondary)', margin:'24px 0 0', maxWidth:680, textWrap:'pretty',
        }}>
          Cuatro sistemas que ya operan en producción. No parten de cero: se conectan a tus herramientas,
          liberan tiempo de tu equipo y le devuelven a tus clientes la capacidad de resolver
          <span style={{ color:'var(--color-text-accent)' }}> en el momento en que lo necesitan</span>.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ÍNDICE ANCLA
══════════════════════════════════════════════════════════ */
function IndexCard({ c, delay }) {
  const [ref, vis] = useReveal(delay);
  return (
    <a ref={ref} href={`#${c.id}`}
      onClick={e => { e.preventDefault(); goTo(c.id); }}
      style={{
        background:'var(--color-canvas)', borderRadius:'var(--radius-2xl)',
        padding:'24px', boxShadow:'var(--shadow-neumorph)', textDecoration:'none',
        display:'flex', flexDirection:'column', gap:14,
        transition:'transform .25s ease, box-shadow .3s ease', ...revStyle(vis),
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-neumorph-lg), var(--shadow-glow-sm)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-neumorph)'; }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{
          width:44, height:44, borderRadius:'var(--radius-lg)', background:'var(--color-accent-subtle)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <i className={`ph-duotone ${c.icon}`} style={{ fontSize:23, color:'var(--color-accent-intense)' }} />
        </div>
        <span style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:700,
                        letterSpacing:'.04em', color:'var(--color-text-muted)' }}>{c.num}</span>
      </div>
      <h3 style={{ fontFamily:'var(--font-subtitle)', fontSize:16, fontWeight:600,
                    letterSpacing:'-0.015em', lineHeight:1.28,
                    color:'var(--color-text-primary)', margin:0 }}>{c.title}</h3>
      <span style={{ fontFamily:'var(--font-body)', fontSize:12.5, fontWeight:600,
                      color:'var(--color-text-secondary)', display:'flex', alignItems:'center', gap:6 }}>
        Ver detalle <i className="ph ph-arrow-down" style={{ fontSize:12 }} />
      </span>
    </a>
  );
}

export function SolucionesIndex() {
  const { width, isMobile } = useViewport();
  const cols = width <= 700 ? '1fr' : width <= 1060 ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
  return (
    <section style={{ padding: isMobile ? '0 24px 64px' : '0 56px 96px', background:'var(--color-canvas)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:cols, gap:16 }}>
        {CASES.map((c, i) => <IndexCard key={c.id} c={c} delay={i * 80} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DETALLE POR CASO DE USO
══════════════════════════════════════════════════════════ */
function StepCard({ s, delay, alt, isMobile }) {
  const [ref, vis] = useReveal(delay);
  return (
    <div ref={ref} style={{
      background: alt ? 'var(--color-canvas)' : 'var(--color-canvas-subtle)',
      borderRadius:'var(--radius-2xl)', padding: isMobile ? '24px' : '28px 30px',
      display:'flex', gap:16, alignItems:'flex-start', ...revStyle(vis),
    }}>
      <div style={{
        width:42, height:42, borderRadius:'50%', flexShrink:0,
        background:'var(--color-canvas)', boxShadow:'var(--shadow-neumorph-sm)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <i className={`ph ${s.icon}`} style={{ fontSize:19, color:'var(--color-text-primary)' }} />
      </div>
      <div style={{ minWidth:0 }}>
        <h3 style={{ fontFamily:'var(--font-subtitle)', fontSize:16, fontWeight:600,
                      letterSpacing:'-0.015em', color:'var(--color-text-primary)', margin:0 }}>{s.t}</h3>
        <p style={{ fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.62,
                     color:'var(--color-text-secondary)', margin:'7px 0 0', textWrap:'pretty' }}>{s.d}</p>
      </div>
    </div>
  );
}

function CaseBlock({ c, index }) {
  const [ref, vis] = useReveal(0);
  const { width, isMobile } = useViewport();
  const alt = index % 2 === 1;
  const stepCols = width <= 700 ? '1fr' : 'repeat(2,1fr)';
  return (
    <section id={c.id} style={{
      position:'relative', overflow:'hidden',
      padding: isMobile ? '64px 24px' : '104px 56px',
      background: alt ? 'var(--color-canvas-subtle)' : 'var(--color-canvas)',
      scrollMarginTop:72,
    }}>
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, backgroundImage:`url(${c.bg})`,
        backgroundSize:'cover', backgroundPosition:'center', opacity:.34, zIndex:0,
      }} />
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:0,
        background: alt
          ? 'linear-gradient(180deg, var(--color-canvas-subtle) 0%, transparent 38%, transparent 62%, var(--color-canvas-subtle) 100%)'
          : 'linear-gradient(180deg, var(--color-canvas) 0%, transparent 38%, transparent 62%, var(--color-canvas) 100%)',
      }} />
      <div style={{ position:'relative', zIndex:1, maxWidth:1280, margin:'0 auto', display:'flex', flexDirection:'column', gap: isMobile ? 36 : 52 }}>
        {/* encabezado */}
        <div ref={ref} style={{
          display:'flex', flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 24 : 64, ...revStyle(vis),
        }}>
          <div style={{ flex:'0 0 auto', display:'flex', alignItems:'flex-start', gap:16 }}>
            <div style={{
              width:64, height:64, borderRadius:'var(--radius-lg)', flexShrink:0,
              background: alt ? 'var(--color-canvas)' : 'var(--color-accent-subtle)',
              boxShadow: alt ? 'var(--shadow-neumorph-sm)' : 'none',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <i className={`ph-duotone ${c.icon}`} style={{ fontSize:32, color:'var(--color-accent-intense)' }} />
            </div>
            <span style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700,
                            letterSpacing:'.04em', color:'var(--color-text-muted)', paddingTop:6 }}>{c.num}</span>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <h2 style={{
              fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,34px)' : 'clamp(32px,3.2vw,46px)',
              fontWeight:700, letterSpacing:'-0.034em', lineHeight:1.1,
              color:'var(--color-text-primary)', margin:0, textWrap:'balance',
            }}>{c.title}</h2>
            <p style={{
              fontFamily:'var(--font-subtitle)', fontSize: isMobile ? 17 : 20, fontWeight:500,
              letterSpacing:'-0.015em', lineHeight:1.32,
              color:'var(--color-text-primary)', margin:'14px 0 0', maxWidth:640,
            }}>{c.claim}</p>
            <p style={{
              fontFamily:'var(--font-body)', fontSize: isMobile ? 15 : 16.5, lineHeight:1.66,
              color:'var(--color-text-secondary)', margin:'18px 0 0', maxWidth:720, textWrap:'pretty',
            }}>{c.intro}</p>
          </div>
        </div>

        {/* pasos */}
        <div style={{ display:'grid', gridTemplateColumns:stepCols, gap:20 }}>
          {c.steps.map((s, i) => (
            <StepCard key={s.t} s={s} delay={i * 80} alt={alt} isMobile={isMobile} />
          ))}
        </div>

        {/* beneficios + canales + CTA */}
        <div style={{ display:'flex', flexDirection: width <= 900 ? 'column' : 'row', gap: isMobile ? 28 : 48, alignItems:'flex-start' }}>
          <ul style={{ flex:1, margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:12, minWidth:0 }}>
            {c.bullets.map(b => (
              <li key={b} style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
                <i className="ph-fill ph-check-circle" style={{ fontSize:18, color:'var(--color-accent-intense)', flexShrink:0, marginTop:2 }} />
                <span style={{ fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.58,
                                color:'var(--color-text-primary)', textWrap:'pretty' }}>{b}</span>
              </li>
            ))}
          </ul>
          <div style={{ flex:'0 0 auto', display:'flex', flexDirection:'column', gap:18, maxWidth: width <= 900 ? '100%' : 380 }}>
            <div>
              <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
                              letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-text-muted)' }}>Se conecta con</span>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:12 }}>
                {c.channels.map(ch => (
                  <span key={ch} style={{
                    fontFamily:'var(--font-body)', fontSize:12.5, fontWeight:500,
                    color:'var(--color-text-secondary)',
                    background: alt ? 'var(--color-canvas)' : 'var(--color-canvas-subtle)',
                    borderRadius:9999, padding:'7px 14px',
                  }}>{ch}</span>
                ))}
              </div>
            </div>
            <button onClick={() => goTo('hablemos')} style={{
              fontFamily:'var(--font-body)', fontSize:14.5, fontWeight:600,
              color:'#fff', background:'var(--color-text-primary)',
              border:'none', borderRadius:'var(--radius-full)', padding:'15px 30px',
              cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:9,
              transition:'transform .2s ease, box-shadow .3s ease', alignSelf:'flex-start',
            }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='none'; }}>
              {c.cta} <i className="ph ph-arrow-right" style={{ fontSize:15 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolucionesCases() {
  return <>{CASES.map((c, i) => <CaseBlock key={c.id} c={c} index={i} />)}</>;
}
