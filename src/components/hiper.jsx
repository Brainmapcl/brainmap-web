/* ─────────────────────────────────────────────────────────────
   hiper.jsx — Página de servicio: Hiperautomatización de Procesos
   Ported from hiper-bundle.jsx (Claude Design handoff) to an ES
   module. Depends on shared.jsx for useReveal/revStyle/useViewport.
   ───────────────────────────────────────────────────────────── */
import { useState } from 'react';
import { useReveal, revStyle, useViewport } from './shared.jsx';
import { DS_BASE } from '../lib/constants.js';

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
const DEFAULT_HERO_IMAGE = { src: `${DS_BASE}/assets/imagery/texture-arch-lattice.webp`, width: 8064, height: 5376 };

export function ServiceHero({ heroImage = DEFAULT_HERO_IMAGE }) {
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
          objectFit:'cover', objectPosition: isMobile ? '68% center' : '82% center', zIndex:0,
        }} />
        <div style={{
          position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
          background: isMobile
            ? 'linear-gradient(180deg, var(--color-canvas) 0%, var(--color-canvas) 50%, rgba(251,251,250,.86) 66%, rgba(251,251,250,.5) 84%, rgba(251,251,250,.25) 100%)'
            : 'linear-gradient(90deg, var(--color-canvas) 0%, var(--color-canvas) 10%, rgba(251,251,250,.82) 32%, rgba(251,251,250,.46) 52%, rgba(251,251,250,.14) 68%, rgba(251,251,250,0) 80%)',
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
              }}>Servicio 01</span>
              <span style={{
                fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'.06em',
                color:'var(--color-text-muted)',
              }}>Hiperautomatización de Procesos</span>
            </div>

            <h1 style={{
              fontFamily:'var(--font-display)',
              fontSize: isMobile ? 'clamp(34px,10vw,46px)' : 'clamp(48px,5vw,72px)', fontWeight:700,
              letterSpacing:'-0.042em', lineHeight:1.1,
              color:'var(--color-text-primary)', margin:0,
            }}>
              Independencia tecnológica,{' '}
              <span style={{ color:'var(--color-text-accent)' }}>por diseño.</span>
            </h1>

            <p style={{
              fontFamily:'var(--font-subtitle)', fontSize: isMobile ? 16 : 18.5, fontWeight:500,
              letterSpacing:'-0.015em', lineHeight:1.5,
              color:'var(--color-text-secondary)', margin:0, maxWidth: isMobile ? '100%' : 480,
            }}>
              Infraestructura digital desde cero — n8n, Power Automate, CRMs y bots conectados de extremo a extremo. Sistemas autónomos y código limpio para que escales sin depender de nadie.
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
  { icon:'ph-puzzle-piece', title:'Parches sobre parches', text:'Hojas de cálculo, automatizaciones sueltas y bots caseros que nadie terminó de documentar.' },
  { icon:'ph-clock-counter-clockwise', title:'Fricción que tu cliente sí nota', text:'Cada tarea manual se traduce en una respuesta más lenta y una experiencia menos consistente.' },
  { icon:'ph-lock-key', title:'Dependencia de terceros', text:'Plataformas cerradas y suscripciones forzadas que no puedes ajustar a tu operación.' },
];

export function ProblemSection() {
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
            Cada parche que agregas hoy es fricción que pagará tu cliente mañana.
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
   MÉTODO — Diagnóstico → Diseño → Implementación
══════════════════════════════════════════════════════════ */
const STEPS = [
  { num:'01', title:'Diagnóstico', text:'Mapeamos tu operación real: herramientas, cuellos de botella y el costo oculto de la fricción actual.' },
  { num:'02', title:'Diseño', text:'Diseñamos la arquitectura del sistema — qué se automatiza, qué se conecta y qué se elimina.' },
  { num:'03', title:'Implementación', text:'Construimos e integramos n8n, Power Automate, CRMs y bots, entregando código limpio y documentado.' },
];

export function MethodSection() {
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
          }}>Diagnóstico. Diseño. Implementación.</h2>
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
  { icon:'ph-repeat', title:'Automatización de tareas repetitivas', text:'Procesos manuales que hoy consumen horas, ejecutándose solos.' },
  { icon:'ph-chats-circle', title:'Atención al cliente con IA conversacional', text:'Respuestas inmediatas y personalizadas, sin depender de un horario de oficina.' },
  { icon:'ph-gauge', title:'Productividad interna', text:'Herramientas y reportes que le devuelven tiempo a tu equipo.' },
  { icon:'ph-funnel', title:'Gestión de leads y CRM', text:'Cada oportunidad capturada, calificada y enrutada sin intervención manual.' },
];

export function SolutionsGridSection() {
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
          Estas son bases de partida. Cada implementación se adapta al stack, los datos y el flujo real de tu equipo.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ANTES / DESPUÉS
══════════════════════════════════════════════════════════ */
const ANTES = [
  'Tareas repetitivas ejecutadas a mano, todos los días',
  'Información dispersa entre planillas, correos y chats',
  'Respuestas a clientes con horas de espera',
  'Reportes armados manualmente antes de cada reunión',
];
const DESPUES = [
  'Flujos automáticos que no requieren supervisión',
  'Un solo sistema conectado de punta a punta',
  'Respuestas inmediatas, disponibles 24/7',
  'Reportes generados en tiempo real, sin intervención',
];

export function BeforeAfterSection() {
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
  { q:'¿Necesito reemplazar mis sistemas actuales?', a:'No. Empezamos por lo que ya tienes — nuestro trabajo es conectar, limpiar y automatizar, no forzarte a migrar todo desde cero.' },
  { q:'¿Cuánto tiempo toma implementar una solución?', a:'Depende del alcance del diagnóstico. Un flujo puntual puede estar operativo en semanas; una arquitectura completa toma más, siempre con entregas incrementales.' },
  { q:'¿Qué pasa si mi equipo no tiene experiencia técnica?', a:'Diseñamos para que el sistema funcione solo. La documentación y las interfaces quedan pensadas para personas, no para ingenieros.' },
  { q:'¿Trabajan con herramientas específicas?', a:'Usamos n8n, Power Automate, CRMs y bots según lo que tu stack ya tiene. No imponemos una plataforma única.' },
  { q:'¿Hay contratos de permanencia?', a:'No. Nuestros sistemas son tuyos, autónomos y sin suscripciones forzadas una vez implementados.' },
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

export function FaqSection() {
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
