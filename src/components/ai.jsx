/* ─────────────────────────────────────────────────────────────
   ai.jsx — Página de servicio: Alfabetización IA
   Ported from ai-bundle.jsx (Claude Design handoff) to an ES
   module. Depends on shared.jsx (useReveal, revStyle, useViewport,
   Internal links rewritten from the *.dc.html prototype
   filenames to their Astro routes.
   ───────────────────────────────────────────────────────────── */
import { useState } from 'react';
import { useReveal, revStyle, useViewport } from './shared.jsx';
import { DS_BASE } from '../lib/constants';

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
const DEFAULT_HERO_IMAGE = { src: `${DS_BASE}/assets/imagery/portrait-2.webp`, width: 3584, height: 5376 };

export function AIServiceHero({ heroImage = DEFAULT_HERO_IMAGE }) {
  const { isMobile } = useViewport();
  return (
    <>
      <section style={{
        position:'fixed', top:0, left:0, right:0, height:'100vh',
        display:'flex', alignItems:'center', overflow:'hidden',
        background:'var(--color-canvas)', zIndex:0,
      }}>
        <img src={heroImage.src} width={heroImage.width} height={heroImage.height} alt="" loading="eager" fetchpriority="high" style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition: isMobile ? '60% 18%' : '78% center', zIndex:0,
        }} />
        <div style={{
          position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
          background: isMobile
            ? 'linear-gradient(180deg, var(--color-canvas) 0%, var(--color-canvas) 46%, rgba(251,251,250,.88) 64%, rgba(251,251,250,.52) 82%, rgba(251,251,250,.26) 100%)'
            : 'linear-gradient(90deg, var(--color-canvas) 0%, var(--color-canvas) 8%, rgba(251,251,250,.84) 30%, rgba(251,251,250,.5) 50%, rgba(251,251,250,.16) 66%, rgba(251,251,250,0) 78%)',
        }} />
        <div style={{
          position:'absolute', top: isMobile ? '18%' : '50%', left: isMobile ? '50%' : '78%',
          transform:'translate(-50%,-50%)', width: isMobile ? 260 : 420, height: isMobile ? 260 : 420,
          borderRadius:'50%', pointerEvents:'none', zIndex:1,
          background:'radial-gradient(ellipse, rgba(243,169,139,.16) 0%, rgba(243,169,139,.06) 45%, transparent 70%)',
        }} />

        <div style={{
          position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto', width:'100%',
          padding: isMobile ? '104px 24px 56px' : '128px 56px 88px',
        }}>
          <div style={{ display:'flex', flexDirection:'column', gap: isMobile ? 20 : 26, maxWidth: isMobile ? '100%' : 620 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <span style={{
                fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
                letterSpacing:'.08em', textTransform:'uppercase',
                color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
                border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
              }}>Servicio 03</span>
              <span style={{
                fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'.06em',
                color:'var(--color-text-muted)',
              }}>Alfabetización IA</span>
            </div>

            <h1 style={{
              fontFamily:'var(--font-display)',
              fontSize: isMobile ? 'clamp(34px,10vw,46px)' : 'clamp(48px,5vw,72px)', fontWeight:700,
              letterSpacing:'-0.042em', lineHeight:1.1,
              color:'var(--color-text-primary)', margin:0,
            }}>
              Productividad adaptativa,{' '}
              <span style={{ color:'var(--color-text-accent)' }}>equipo por equipo.</span>
            </h1>

            <p style={{
              fontFamily:'var(--font-subtitle)', fontSize: isMobile ? 16 : 18.5, fontWeight:500,
              letterSpacing:'-0.015em', lineHeight:1.5,
              color:'var(--color-text-secondary)', margin:0, maxWidth: isMobile ? '100%' : 480,
            }}>
              Apoyamos a tus equipos en la adopción de herramientas IA según su madurez real — maximizando su potencial creativo y operativo, sin reemplazar a nadie.
            </p>

            <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'center', marginTop: isMobile ? 4 : 8 }}>
              <a href="#hablemos"
                style={{
                  fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  color:'#fff', background:'var(--color-text-primary)',
                  border:'none', borderRadius:'var(--radius-full)', padding:'15px 32px',
                  cursor:'pointer', boxShadow:'0 4px 24px rgba(30,30,31,.22)',
                  transition:'transform .2s ease, box-shadow .2s ease',
                  width: isMobile ? '100%' : 'auto', textDecoration:'none', textAlign:'center',
                  display:'inline-block', boxSizing:'border-box',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 9px 36px rgba(30,30,31,.27)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 24px rgba(30,30,31,.22)'; }}
                onMouseDown={e=>{ e.currentTarget.style.transform='translateY(1px)'; }}>
                Agendar diagnóstico gratuito
              </a>
              <a href="/#servicios" style={{
                fontFamily:'var(--font-body)', fontSize:14, fontWeight:500,
                color:'var(--color-text-secondary)', textDecoration:'none',
                display:'flex', alignItems:'center', gap:6,
              }}
                onMouseEnter={e=>e.currentTarget.style.color='var(--color-text-primary)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--color-text-secondary)'}>
                <i className="ph ph-arrow-left" style={{ fontSize:14 }} />
                Volver a servicios
              </a>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height:'100vh' }} aria-hidden="true" />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   PROBLEMA
══════════════════════════════════════════════════════════ */
const PAIN_POINTS = [
  { icon:'ph-scatter-chart', title:'IA usada de forma dispersa', text:'Cada persona prueba herramientas distintas, sin criterio común ni buenas prácticas compartidas.' },
  { icon:'ph-warning-circle', title:'Miedo al reemplazo, no al apoyo', text:'Sin acompañamiento, la IA se percibe como amenaza — no como una extensión del propio criterio.' },
  { icon:'ph-gauge', title:'Adopción a medias, sin seguimiento', text:'Herramientas activadas una vez y abandonadas, sin método ni acompañamiento posterior.' },
];

export function AIProblemSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile, width } = useViewport();
  const cols = width <= 900 ? '1fr' : 'repeat(3,1fr)';
  return (
    <section style={{ padding: isMobile ? '72px 24px' : '112px 56px', background:'var(--color-canvas-subtle)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div ref={ref} style={{ maxWidth:760, marginBottom: isMobile ? 40 : 60, ...revStyle(vis) }}>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-text-muted)',
          }}>El problema</span>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(32px,3.4vw,46px)',
            fontWeight:700, letterSpacing:'-0.034em', lineHeight:1.18,
            color:'var(--color-text-primary)', margin:'14px 0 0', textWrap:'pretty',
          }}>
            La brecha no es de tecnología. Es de madurez y método.
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: cols, gap:24 }}>
          {PAIN_POINTS.map((p, i) => {
            const [cRef, cVis] = useReveal(i * 90);
            return (
              <div key={i} ref={cRef} style={{
                background:'var(--color-canvas)', borderRadius:'var(--radius-2xl)',
                padding: isMobile ? '28px' : '32px', boxShadow:'var(--shadow-neumorph)',
                display:'flex', flexDirection:'column', gap:16, ...revStyle(cVis),
              }}>
                <div style={{
                  width:52, height:52, borderRadius:'var(--radius-lg)',
                  background:'var(--color-canvas-subtle)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <i className={`ph ${p.icon}`} style={{ fontSize:26, color:'var(--color-chrome-dark)' }} />
                </div>
                <h3 style={{
                  fontFamily:'var(--font-subtitle)', fontSize:18, fontWeight:600,
                  letterSpacing:'-0.015em', lineHeight:1.25, color:'var(--color-text-primary)', margin:0,
                }}>{p.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14.5, lineHeight:1.65, color:'var(--color-text-secondary)', margin:0 }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   MÉTODO — Diagnóstico de madurez → Formación a medida → Adopción sostenida
══════════════════════════════════════════════════════════ */
const STEPS = [
  { num:'01', title:'Diagnóstico de madurez', text:'Medimos el nivel de adopción real de IA por persona y por área, sin asumir un punto de partida único.' },
  { num:'02', title:'Formación a medida', text:'Talleres prácticos ajustados a cada nivel — sin teoría genérica, con casos de tu propia operación.' },
  { num:'03', title:'Adopción sostenida', text:'Acompañamos la aplicación real en el día a día, hasta que la herramienta se vuelve hábito.' },
];

export function AIMethodSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile, width } = useViewport();
  const cols = width <= 900 ? '1fr' : 'repeat(3,1fr)';
  return (
    <section style={{ padding: isMobile ? '72px 24px' : '112px 56px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div ref={ref} style={{ textAlign: isMobile ? 'left' : 'center', marginBottom: isMobile ? 36 : 56, ...revStyle(vis) }}>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-accent-intense)',
          }}>Cómo trabajamos</span>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(32px,3.2vw,44px)',
            fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.15,
            color:'var(--color-text-primary)', margin:'14px 0 0',
          }}>Diagnóstico de madurez. Formación a medida. Adopción sostenida.</h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: cols, gap: isMobile ? 20 : 0 }}>
          {STEPS.map((s, i) => {
            const [cRef, cVis] = useReveal(i * 100);
            return (
              <div key={i} ref={cRef} style={{
                padding: isMobile ? '0' : '0 32px',
                borderLeft: (!isMobile && i > 0) ? '1px solid var(--color-border)' : 'none',
                display:'flex', flexDirection:'column', gap:14, ...revStyle(cVis),
              }}>
                <span style={{
                  fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'.1em',
                  color:'var(--color-rose-gold)',
                }}>{s.num}</span>
                <h3 style={{
                  fontFamily:'var(--font-display)', fontSize:22, fontWeight:700,
                  letterSpacing:'-0.02em', color:'var(--color-text-primary)', margin:0,
                }}>{s.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.65, color:'var(--color-text-secondary)', margin:0 }}>{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SOLUCIONES PREDETERMINADAS
══════════════════════════════════════════════════════════ */
const SOLUTIONS = [
  { icon:'ph-gauge', title:'Diagnóstico de madurez IA por equipo', text:'Medimos el punto de partida real de cada área antes de proponer cualquier formación.' },
  { icon:'ph-chalkboard-teacher', title:'Talleres y formación práctica', text:'Sesiones a medida, con casos y herramientas de tu propia operación, no genéricas.' },
  { icon:'ph-shield-check', title:'Guías de uso responsable de IA', text:'Políticas claras que dan seguridad al equipo sobre qué, cómo y cuándo usar estas herramientas.' },
  { icon:'ph-plant', title:'Acompañamiento continuo de adopción', text:'Seguimiento posterior al taller, para que la herramienta se vuelva hábito real.' },
];

export function AISolutionsGridSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile, width } = useViewport();
  const cols = width <= 640 ? '1fr' : width <= 1024 ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
  return (
    <section style={{ padding: isMobile ? '72px 24px' : '112px 56px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div ref={ref} style={{ textAlign:'center', marginBottom: isMobile ? 36 : 52, ...revStyle(vis) }}>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(32px,3.2vw,44px)',
            fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.12,
            color:'var(--color-text-primary)', margin:0,
          }}>Soluciones ya probadas</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: cols, gap:20 }}>
          {SOLUTIONS.map((c, i) => {
            const [cRef, cVis] = useReveal(i * 90);
            return (
              <div key={i} ref={cRef} style={{
                background:'var(--color-canvas-subtle)', borderRadius:'var(--radius-2xl)',
                padding: isMobile ? '26px' : '28px', boxShadow:'var(--shadow-sm)',
                display:'flex', flexDirection:'column', gap:16,
                transition:'transform .25s ease, box-shadow .3s ease', ...revStyle(cVis),
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}>
                <div style={{
                  width:48, height:48, borderRadius:'var(--radius-lg)',
                  background:'var(--color-accent-subtle)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <i className={`ph ${c.icon}`} style={{ fontSize:24, color:'var(--color-accent-intense)' }} />
                </div>
                <h3 style={{
                  fontFamily:'var(--font-subtitle)', fontSize:16.5, fontWeight:600,
                  letterSpacing:'-0.01em', lineHeight:1.28, color:'var(--color-text-primary)', margin:0,
                }}>{c.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.6, color:'var(--color-text-secondary)', margin:0 }}>{c.text}</p>
              </div>
            );
          })}
        </div>

        <p style={{
          fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--color-text-muted)',
          textAlign:'center', maxWidth:560, margin: isMobile ? '32px auto 0' : '44px auto 0', lineHeight:1.6,
        }}>
          Estas son bases de partida. Cada programa se ajusta a la madurez real de tu equipo y tus herramientas.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ANTES / DESPUÉS
══════════════════════════════════════════════════════════ */
const ANTES = [
  'Cada persona explora IA por su cuenta, sin criterio compartido',
  'La IA genera desconfianza o se percibe como amenaza',
  'Herramientas activadas una vez y luego abandonadas',
  'Brechas de productividad entre quienes adoptan y quienes no',
];
const DESPUES = [
  'Un criterio común de uso, compartido por todo el equipo',
  'La IA se entiende como apoyo al criterio, no como reemplazo',
  'Adopción acompañada hasta volverse hábito real',
  'Productividad pareja, sostenida por formación continua',
];

export function AIBeforeAfterSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section style={{ padding: isMobile ? '72px 24px' : '112px 56px', background:'var(--color-canvas-subtle)', position:'relative', overflow:'hidden', zIndex:1 }}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`url(${DS_BASE}/assets/imagery/texture-structural.webp)`,
        backgroundSize:'cover', backgroundPosition:'center', opacity:.03, pointerEvents:'none',
      }} />
      <div style={{ maxWidth:1120, margin:'0 auto', position:'relative' }}>
        <div ref={ref} style={{ textAlign:'center', marginBottom: isMobile ? 36 : 56, ...revStyle(vis) }}>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(32px,3.2vw,44px)',
            fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.15,
            color:'var(--color-text-primary)', margin:0,
          }}>Antes y después de brainmap</h2>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr',
          gap: isMobile ? 20 : 28, alignItems:'stretch',
        }}>
          <Panel title="Antes" items={ANTES} tone="muted" delay={0} />

          {!isMobile && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{
                width:44, height:44, borderRadius:'50%', background:'var(--color-canvas)',
                boxShadow:'var(--shadow-neumorph)', display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <i className="ph ph-arrow-right" style={{ fontSize:20, color:'var(--color-accent-intense)' }} />
              </div>
            </div>
          )}

          <Panel title="Después" items={DESPUES} tone="accent" delay={120} />
        </div>
      </div>
    </section>
  );
}

function Panel({ title, items, tone, delay }) {
  const [ref, vis] = useReveal(delay);
  const accent = tone === 'accent';
  return (
    <div ref={ref} style={{
      background: accent ? 'var(--color-canvas-elevated)' : 'var(--color-canvas)',
      border: accent ? '1px solid var(--color-border-accent)' : '1px solid var(--color-border)',
      borderRadius:'var(--radius-2xl)', padding:'32px 28px',
      boxShadow: accent ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      display:'flex', flexDirection:'column', gap:20, ...revStyle(vis),
    }}>
      <span style={{
        fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
        letterSpacing:'.1em', textTransform:'uppercase',
        color: accent ? 'var(--color-accent-intense)' : 'var(--color-text-muted)',
      }}>{title}</span>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {items.map((t, i) => (
          <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
            <i className={accent ? 'ph-fill ph-check-circle' : 'ph ph-x-circle'} style={{
              fontSize:18, marginTop:1, flexShrink:0,
              color: accent ? 'var(--color-accent-intense)' : 'var(--color-text-muted)',
            }} />
            <span style={{ fontFamily:'var(--font-body)', fontSize:14.5, lineHeight:1.55, color:'var(--color-text-secondary)' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════ */
const FAQS = [
  { q:'¿A qué nivel de equipo está dirigido el programa?', a:'A cualquier nivel de madurez. Empezamos midiendo el punto de partida real de cada persona y área, sin asumir un piso común.' },
  { q:'¿Cuánto dura el proceso de formación?', a:'Depende del alcance del diagnóstico. Los talleres iniciales toman semanas; el acompañamiento de adopción es continuo hasta que la herramienta se vuelve hábito.' },
  { q:'¿La IA reemplazará a mi equipo?', a:'No. Trabajamos la IA como extensión del criterio humano, no como sustituto — el objetivo es potenciar, no reemplazar.' },
  { q:'¿Cómo medimos el impacto en productividad?', a:'Definimos indicadores concretos desde el diagnóstico — tiempo ahorrado, calidad de output y adopción sostenida en el tiempo.' },
  { q:'¿Trabajan con herramientas específicas de IA?', a:'Nos adaptamos a las herramientas que tu equipo ya usa o necesita, sin imponer una plataforma única.' },
];

function FaqItem({ item, open, onToggle }) {
  const [ref, vis] = useReveal(0);
  return (
    <div ref={ref} style={{
      borderBottom:'1px solid var(--color-border)', ...revStyle(vis),
    }}>
      <button onClick={onToggle} style={{
        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
        background:'none', border:'none', cursor:'pointer', padding:'22px 4px', textAlign:'left',
      }}>
        <span style={{
          fontFamily:'var(--font-subtitle)', fontSize:16.5, fontWeight:600,
          color:'var(--color-text-primary)',
        }}>{item.q}</span>
        <i className={open ? 'ph ph-minus' : 'ph ph-plus'} style={{
          fontSize:18, color:'var(--color-accent-intense)', flexShrink:0,
          transition:'transform .25s ease',
        }} />
      </button>
      <div style={{
        maxHeight: open ? 240 : 0, overflow:'hidden',
        transition:'max-height .35s cubic-bezier(.25,.46,.45,.94)',
      }}>
        <p style={{
          fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.68,
          color:'var(--color-text-secondary)', margin:'0 0 24px', maxWidth:680,
        }}>{item.a}</p>
      </div>
    </div>
  );
}

export function AIFaqSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: isMobile ? '72px 24px' : '112px 56px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:820, margin:'0 auto' }}>
        <div ref={ref} style={{ marginBottom: isMobile ? 32 : 44, ...revStyle(vis) }}>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase', color:'var(--color-text-muted)',
          }}>Preguntas frecuentes</span>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(30px,3vw,40px)',
            fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.18,
            color:'var(--color-text-primary)', margin:'14px 0 0',
          }}>Lo que suelen preguntarnos antes de empezar</h2>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <FaqItem key={i} item={f} open={open === i} onToggle={() => setOpen(o => o === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
