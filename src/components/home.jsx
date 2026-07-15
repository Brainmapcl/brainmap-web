/* ─────────────────────────────────────────────────────────────
   home.jsx — Brainmap home page components
   Ported from home-bundle.jsx (Claude Design handoff) to an ES
   module. Internal links rewritten from the *.dc.html prototype
   filenames to their Astro routes.
   ───────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from 'react';
import { DS_BASE } from '../lib/constants';
import { useReveal, revStyle, useViewport } from './shared.jsx';

/* ══════════════════════════════════════════════════════════
   HERO — Fase 1
══════════════════════════════════════════════════════════ */
const DEFAULT_HERO_IMAGE = { src: '/assets/hero-editorial.webp', width: 2752, height: 1536 };

export function HeroSection({ heroImage = DEFAULT_HERO_IMAGE }) {
  const { isMobile } = useViewport();
  return (
    <>
      <section id="inicio" style={{
        position:'fixed', top:0, left:0, right:0, height:'100vh',
        display:'flex', alignItems:'center', overflow:'hidden',
        background:'var(--color-canvas)', zIndex:0,
      }}>
        {/* editorial background image — process & experience. LCP element: eager + high priority, never lazy. */}
        <img src={heroImage.src} width={heroImage.width} height={heroImage.height} alt="" loading="eager" fetchpriority="high" style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition: isMobile ? '68% center' : '78% center', zIndex:0,
        }} />

        {/* fade: opaque near the copy, clearer toward the edge */}
        <div style={{
          position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
          background: isMobile
            ? 'linear-gradient(180deg, var(--color-canvas) 0%, var(--color-canvas) 52%, rgba(251,251,250,.86) 68%, rgba(251,251,250,.55) 84%, rgba(251,251,250,.30) 100%)'
            : 'linear-gradient(90deg, var(--color-canvas) 0%, var(--color-canvas) 8%, rgba(251,251,250,.80) 30%, rgba(251,251,250,.42) 50%, rgba(251,251,250,.10) 66%, rgba(251,251,250,0) 78%)',
        }} />

        <div style={{
          position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto', width:'100%',
          padding: isMobile ? '104px 24px 56px' : '128px 56px 88px',
        }}>
          {/* ── Left copy ── */}
          <div style={{ display:'flex', flexDirection:'column', gap: isMobile ? 22 : 28, maxWidth: isMobile ? '100%' : 600 }}>
            <div>
              <span style={{
                fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
                letterSpacing:'.08em', textTransform:'uppercase',
                color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
                border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
              }}>Ingeniería Empática</span>
            </div>

            <h1 style={{
              fontFamily:'var(--font-display)',
              fontSize: isMobile ? 'clamp(36px,10.5vw,50px)' : 'clamp(52px,5.4vw,78px)', fontWeight:700,
              letterSpacing:'-0.042em', lineHeight:1.1,
              color:'var(--color-text-primary)', margin:0,
            }}>
              {isMobile ? (
                <>la experiencia de tus clientes al{' '}
                  <span style={{ color:'var(--color-text-accent)' }}>siguiente nivel</span>
                </>
              ) : (
                <>la experiencia de<br />
                  tus clientes al<br />
                  <span style={{ color:'var(--color-text-accent)' }}>siguiente nivel</span>
                </>
              )}
            </h1>

            <p style={{
              fontFamily:'var(--font-subtitle)', fontSize: isMobile ? 17 : 19, fontWeight:500,
              letterSpacing:'-0.015em', lineHeight:1.45,
              color:'var(--color-text-secondary)', margin:0, maxWidth: isMobile ? '100%' : 450,
            }}>
              el poder de la automatización al servicio de tu empresa
            </p>

            <div style={{ width: isMobile ? '100%' : 'auto' }}>
              <a href="#hablemos"
                style={{
                  fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  color:'#fff', background:'var(--color-text-primary)',
                  border:'none', borderRadius:'var(--radius-full)', padding:'15px 36px',
                  cursor:'pointer', boxShadow:'0 4px 24px rgba(30,30,31,.22)',
                  transition:'transform .2s ease, box-shadow .2s ease',
                  width: isMobile ? '100%' : 'auto', textDecoration:'none', textAlign:'center',
                  display:'inline-block', boxSizing:'border-box',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 9px 36px rgba(30,30,31,.27)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 24px rgba(30,30,31,.22)'; }}
                onMouseDown={e=>{ e.currentTarget.style.transform='translateY(1px)'; }}>
                Iniciar Transformación
              </a>
            </div>
          </div>
        </div>

        {/* scroll nudge */}
        {!isMobile && (
          <a href="#propuesta-valor" style={{
            position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6, zIndex:2,
            opacity:.4, cursor:'pointer', transition:'opacity .2s', textDecoration:'none',
          }}
            onMouseEnter={e=>e.currentTarget.style.opacity='.8'}
            onMouseLeave={e=>e.currentTarget.style.opacity='.4'}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:11, letterSpacing:'.1em',
                            textTransform:'uppercase', color:'var(--color-text-muted)' }}>scroll</span>
            <i className="ph ph-arrow-down" style={{ fontSize:18, color:'var(--color-text-muted)' }} />
          </a>
        )}
      </section>

      {/* spacer — reserves the flow space the fixed hero occupies, so the next
          section scrolls up and covers it like a curtain */}
      <div style={{ height:'100vh' }} aria-hidden="true" />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   DIAGNOSIS — Fase 2 / Propuesta de Valor
══════════════════════════════════════════════════════════ */
export function DiagnosisSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section id="propuesta-valor" style={{
      padding: isMobile ? '72px 24px' : '128px 56px', background:'var(--color-canvas-subtle)',
      position:'relative', overflow:'hidden', zIndex:1,
    }}>
      {/* texture */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`url(${DS_BASE}/assets/imagery/texture-structural.webp)`,
        backgroundSize:'cover', backgroundPosition:'center', opacity:.030, pointerEvents:'none',
      }} />

      <div ref={ref} style={{ maxWidth:1040, margin:'0 auto', ...revStyle(vis) }}>
        <h2 style={{
          fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(28px,8vw,36px)' : 'clamp(36px,4.2vw,58px)',
          fontWeight:700, letterSpacing:'-0.036em', lineHeight:1.16,
          color:'var(--color-text-primary)', margin: isMobile ? '0 0 20px' : '0 0 28px', maxWidth: isMobile ? '100%' : 820,
          textWrap:'pretty',
        }}>
          Nuestra propuesta de valor es profunda, no superficial.
          Tus clientes no se van por precio.{' '}
          <span style={{ color:'var(--color-text-accent)' }}>Se van por una mala orquestación.</span>
        </h2>

        <div style={{
          width:56, height:2, background:'var(--color-accent)',
          borderRadius:2, marginBottom: isMobile ? 24 : 32,
        }} />

        <p style={{
          fontFamily:'var(--font-body)', fontSize: isMobile ? 15.5 : 17, lineHeight:1.68,
          color:'var(--color-text-secondary)', maxWidth: isMobile ? '100%' : 660, margin:0,
        }}>
          Los mapas de viaje tradicionales se quedan en el papel. El cliente del futuro exige inmediatez, automatización y cero fricciones. Diseñamos e implementamos la infraestructura digital y el backend real que tu negocio necesita para cumplir esa promesa.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SERVICES — Fase 3 / Ecosistema vertical
══════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num:'01', icon:'ph-flow-arrow', align:'left',
    title:'Hiperautomatización de Procesos',
    text:'Independencia Tecnológica. Infraestructura digital desde cero: N8N, Power Automate, CRMs y Bots integrados de extremo a extremo. Entregamos sistemas autónomos y código limpio para que escales sin dependencias.',
    cta:'Ver stack tecnológico',
    href:'/servicios/hiperautomatizacion',
  },
  {
    num:'02', icon:'ph-users-three', align:'right',
    title:'Experiencia de Clientes y Diseño del Futuro',
    text:'Respuestas Inmediatas. Abordamos la experiencia (CX/EX) como algo integral del mundo real. Soluciones automáticas y personalizadas de principio a fin para líderes y gerencias que necesitan erradicar la fricción ahora.',
    cta:'Ver alcance de consultoría',
    href:'/servicios/experiencia-clientes',
  },
  {
    num:'03', icon:'ph-brain', align:'left',
    title:'Alfabetización IA',
    text:'Productividad Adaptativa. Apoyamos a tus equipos en la adopción de herramientas IA según su madurez. Maximizamos su potencial creativo y operativo, impulsando el valor real del negocio.',
    cta:'Ver metodología de adopción',
    href:'/servicios/alfabetizacion-ia',
  },
];

function ServiceBlock({ num, icon, align, title, text, cta, href, delay }) {
  const [ref, vis] = useReveal(delay);
  const { isMobile } = useViewport();
  const left = align === 'left';
  const dx = isMobile ? 0 : (left ? -20 : 20);

  const glassPanel = (
    <div style={{
      flex: isMobile ? '1 1 auto' : '0 0 400px', width: isMobile ? '100%' : 'auto', height: isMobile ? 240 : 340,
      background:'rgba(251,251,250,.72)',
      backdropFilter:'blur(28px) saturate(170%)',
      WebkitBackdropFilter:'blur(28px) saturate(170%)',
      border:'1px solid rgba(255,255,255,.78)',
      borderRadius:'var(--radius-2xl)',
      boxShadow:'0 8px 36px rgba(0,0,0,.07), 0 2px 8px rgba(0,0,0,.04)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:20,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', bottom:-40, right:-40, width:220, height:220, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(243,169,139,.10) 0%, transparent 68%)',
        pointerEvents:'none',
      }} />
      <div style={{
        width:88, height:88, borderRadius:'var(--radius-2xl)',
        background:'var(--color-accent-subtle)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'var(--shadow-neumorph-sm)',
      }}>
        <i className={`ph-duotone ${icon}`} style={{ fontSize:46, color:'var(--color-accent-intense)' }} />
      </div>
      <span style={{
        fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.14em',
        color:'var(--color-text-muted)', textTransform:'uppercase',
      }}>{num}</span>
    </div>
  );

  const textPanel = (
    <div style={{ flex:1, display:'flex', flexDirection:'column', gap:20, padding: isMobile ? '0' : '0 8px' }}>
      <span style={{
        fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.12em',
        color:'var(--color-text-accent)', textTransform:'uppercase',
      }}>{num}</span>
      <h3 style={{
        fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(24px,7vw,30px)' : 'clamp(28px,2.8vw,40px)',
        fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.15,
        color:'var(--color-text-primary)', margin:0,
      }}>{title}</h3>
      <p style={{
        fontFamily:'var(--font-body)', fontSize: isMobile ? 15 : 16, lineHeight:1.68,
        color:'var(--color-text-secondary)', margin:0, maxWidth: isMobile ? '100%' : 480,
      }}>{text}</p>
      <button
        onClick={href ? () => { window.location.href = href; } : undefined}
        style={{
          alignSelf:'flex-start',
          fontFamily:'var(--font-body)', fontSize:13, fontWeight:500,
          color:'var(--color-accent-intense)',
          background:'var(--color-accent-subtle)',
          border:'1px solid var(--color-border-accent)',
          borderRadius:'var(--radius-full)', padding:'9px 22px',
          cursor:'pointer', boxShadow:'var(--shadow-neumorph-xs)',
          transition:'all .22s ease',
        }}
        onMouseEnter={e=>{ e.currentTarget.style.boxShadow='var(--shadow-neumorph)'; }}
        onMouseLeave={e=>{ e.currentTarget.style.boxShadow='var(--shadow-neumorph-xs)'; }}
        onMouseDown={e=>{ e.currentTarget.style.boxShadow='var(--shadow-neumorph-inset)'; }}
        onMouseUp={e=>{ e.currentTarget.style.boxShadow='var(--shadow-neumorph)'; }}>
        {cta}
      </button>
    </div>
  );

  return (
    <div ref={ref} style={{
      display:'flex', flexDirection: isMobile ? 'column' : (left ? 'row' : 'row-reverse'),
      gap: isMobile ? 32 : 68, alignItems: isMobile ? 'stretch' : 'center', ...revStyle(vis, dx),
    }}>
      {isMobile
        ? <>{glassPanel}{textPanel}</>
        : left
          ? <>{glassPanel}{textPanel}</>
          : <>{textPanel}{glassPanel}</>}
    </div>
  );
}

export function ServicesSection() {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  return (
    <section id="servicios" style={{ padding: isMobile ? '72px 24px' : '128px 56px', background:'var(--color-canvas)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexDirection:'column', gap: isMobile ? 56 : 96 }}>
        <div ref={ref} style={{
          display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 14 : 0, ...revStyle(vis),
        }}>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(28px,8vw,36px)' : 'clamp(36px,4vw,52px)',
            fontWeight:700, letterSpacing:'-0.036em', lineHeight:1.1,
            color:'var(--color-text-primary)', margin:0,
          }}>Ecosistema de Servicios</h2>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase',
            color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
            border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
          }}>Tres pilares</span>
        </div>
        {SERVICES.map((s, i) => <ServiceBlock key={s.num} {...s} delay={i * 80} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ADVANCED GRID — soluciones
══════════════════════════════════════════════════════════ */
const GRID_CARDS = [
  { icon:'ph-magnifying-glass', title:'Auditorías de Fricción Tecnológica', text:'Mapeo, saneamiento y limpieza de parches digitales obsoletos.' },
  { icon:'ph-desktop', title:'Experiencia del Empleado Digital (EX)', text:'Diseñamos los sistemas internos de tus colaboradores. Si su herramienta es compleja, tu cliente sufrirá las consecuencias.' },
  { icon:'ph-lightning', title:'Gestión del Cambio Cultural', text:'Metodologías, auditorías y buenas prácticas para instaurar una cultura centrada en el cliente desde la ingeniería.' },
];

export function AdvancedGridSection() {
  const [ref, vis] = useReveal(0);
  const { width, isMobile } = useViewport();
  const cols = width <= 640 ? '1fr' : width <= 1024 ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
  return (
    <section style={{ padding: isMobile ? '72px 24px' : '104px 56px', background:'var(--color-canvas-subtle)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div ref={ref} style={{ textAlign:'center', marginBottom: isMobile ? 36 : 52, ...revStyle(vis) }}>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,32px)' : 'clamp(32px,3.2vw,44px)',
            fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.12,
            color:'var(--color-text-primary)', margin:0,
          }}>Soluciones Avanzadas</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: cols, gap:24 }}>
          {GRID_CARDS.map((c, i) => {
            const [cRef, cVis] = useReveal(i * 100);
            return (
              <div key={i} ref={cRef} style={{
                background:'var(--color-canvas)', borderRadius:'var(--radius-2xl)',
                padding: isMobile ? '28px' : '36px', boxShadow:'var(--shadow-neumorph)',
                display:'flex', flexDirection:'column', gap:18,
                transition:'transform .25s ease, box-shadow .3s ease',
                cursor:'default', ...revStyle(cVis),
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='var(--shadow-neumorph-lg), var(--shadow-glow-sm)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-neumorph)'; }}>
                <div style={{
                  width:54, height:54, borderRadius:'var(--radius-lg)',
                  background:'var(--color-accent-subtle)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <i className={`ph-duotone ${c.icon}`} style={{ fontSize:28, color:'var(--color-accent-intense)' }} />
                </div>
                <h3 style={{
                  fontFamily:'var(--font-subtitle)', fontSize:18, fontWeight:600,
                  letterSpacing:'-0.015em', lineHeight:1.25,
                  color:'var(--color-text-primary)', margin:0,
                }}>{c.title}</h3>
                <p style={{
                  fontFamily:'var(--font-body)', fontSize:14.5, lineHeight:1.65,
                  color:'var(--color-text-secondary)', margin:0,
                }}>{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT — Fase 4 / Hub de conversión
══════════════════════════════════════════════════════════ */
export function ContactSection({ chat }) {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  const [form, setForm]   = useState({ name:'', phone:'', email:'', msg:'' });
  const [sent, setSent]   = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => chat.startChat(form), 900);
  }

  const inputSt = {
    fontFamily:'var(--font-body)', fontSize:15,
    color:'var(--color-text-primary)', background:'var(--color-canvas)',
    border:'1.5px solid transparent', borderRadius:'var(--radius-input)',
    padding:'14px 18px', outline:'none', width:'100%', boxSizing:'border-box',
    boxShadow:'var(--shadow-neumorph-inset)',
    transition:'border-color .2s ease, box-shadow .25s ease',
  };
  const onFocus = e => { e.target.style.borderColor='var(--color-accent)'; e.target.style.boxShadow='var(--shadow-neumorph-inset), 0 0 0 3px rgba(243,169,139,.11)'; };
  const onBlur  = e => { e.target.style.borderColor='transparent';          e.target.style.boxShadow='var(--shadow-neumorph-inset)'; };
  const lbl = t => <label style={{ fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, color:'var(--color-text-secondary)' }}>{t}</label>;

  return (
    <section id="hablemos" style={{
      padding: isMobile ? '72px 24px' : '132px 56px', background:'var(--color-text-primary)',
      position:'relative', overflow:'hidden', zIndex:1,
    }}>
      {/* video background — loops continuously */}
      <video autoPlay muted playsInline loop
        src="/assets/hablemos-bg.mp4"
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', zIndex:0,
        }} />

      {/* canvas-tinted veil so copy & form stay legible over the footage */}
      <div style={{
        position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background:'rgba(251,251,250,.82)',
      }} />

      {/* warm coral bloom from bottom */}
      <div style={{
        position:'absolute', bottom:-80, left:'50%', transform:'translateX(-50%)',
        width:900, height:480, borderRadius:'50%', pointerEvents:'none', zIndex:1,
        background:'radial-gradient(ellipse, rgba(243,169,139,.12) 0%, rgba(243,169,139,.05) 40%, transparent 68%)',
      }} />

      <div ref={ref} style={{
        maxWidth:1280, margin:'0 auto', position:'relative', zIndex:2,
        display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 88, alignItems:'start',
        ...revStyle(vis),
      }}>

        {/* ── Left copy ── */}
        <div>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase',
            color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
            border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
          }}>Hablemos</span>

          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,34px)' : 'clamp(34px,3.8vw,52px)',
            fontWeight:700, letterSpacing:'-0.036em', lineHeight:1.14,
            color:'var(--color-text-primary)', margin:'20px 0 18px',
          }}>
            Diseñemos tu infraestructura del futuro.
          </h2>

          <p style={{
            fontFamily:'var(--font-body)', fontSize:16, lineHeight:1.68,
            color:'var(--color-text-secondary)', margin:'0 0 36px', maxWidth:400,
          }}>
            Analizamos tu operación, identificamos la fricción real y presentamos un plan concreto. Sin propuestas genéricas.
          </p>

          {['Diagnóstico gratuito','Propuesta técnica y a la medida','Sin contratos forzosos ni suscripciones'].map((t,i) => (
            <div key={i} style={{ display:'flex', gap:14, alignItems:'center', marginBottom:14 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--color-accent)', flexShrink:0 }} />
              <span style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-secondary)' }}>{t}</span>
            </div>
          ))}
        </div>

        {/* ── Right form ── */}
        <div style={{
          background:'var(--color-canvas-elevated)', borderRadius:'var(--radius-2xl)',
          padding: isMobile ? '26px' : '40px', boxShadow:'var(--shadow-lg)',
        }}>
          {sent ? (
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:16, padding:'48px 24px', textAlign:'center',
            }}>
              <i className="ph-duotone ph-check-circle" style={{ fontSize:60, color:'var(--color-accent)' }} />
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700,
                            margin:0, color:'var(--color-text-primary)' }}>¡Mensaje enviado!</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-secondary)', margin:0 }}>
                Karin iniciará el chat contigo en un momento…
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {lbl('Nombre Completo')}
                  <input required placeholder="Ej: Andrea González"
                    value={form.name} onChange={set('name')}
                    style={inputSt} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {lbl('Teléfono de Contacto')}
                  <input type="tel" placeholder="Ej:+56 9 1234 5678"
                    value={form.phone} onChange={set('phone')}
                    style={inputSt} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {lbl('Correo Electrónico')}
                  <input type="email" required placeholder="Ej: usuario@gmail.com"
                    value={form.email} onChange={set('email')}
                    style={inputSt} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {lbl('Cuéntanos ¿Qué necesitas?')}
                  <textarea rows={4} placeholder="¿Qué proceso necesitas automatizar? ¿Cuál es el problema que más te afecta? ¿Tienes una idea que desarrollar?"
                    value={form.msg} onChange={set('msg')}
                    style={{ ...inputSt, resize:'none', lineHeight:1.6 }}
                    onFocus={onFocus} onBlur={onBlur} />
                </div>
                <button type="submit" style={{
                  fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  color:'#fff', background:'var(--color-text-primary)',
                  border:'none', borderRadius:'var(--radius-full)',
                  padding:'16px 32px', width:'100%', cursor:'pointer',
                  boxShadow:'0 4px 20px rgba(30,30,31,.18)',
                  transition:'transform .2s ease, box-shadow .2s ease',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(30,30,31,.23)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(30,30,31,.18)'; }}>
                  <i className="ph ph-chat-dots" style={{ fontSize:18 }} />
                  Enviar e Iniciar Chat
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
