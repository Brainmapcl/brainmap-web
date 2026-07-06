/* ─────────────────────────────────────────────────────────────
   home.jsx — Brainmap home page components
   Ported from home-bundle.jsx (Claude Design handoff) to an ES
   module. Internal links rewritten from the *.dc.html prototype
   filenames to their Astro routes.
   ───────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from 'react';
import { DS_BASE } from '../lib/constants';

/* ── Hook: reveal on scroll ──────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, vis];
}

const revStyle = (vis, dx = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : `translate(${dx}px, 20px)`,
  transition: 'opacity var(--duration-enter,.65s) var(--ease-out), transform var(--duration-enter,.65s) var(--ease-out)',
});

/* ── Hook: viewport breakpoints ──────────────────────────── */
function useViewport() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return { width: w, isMobile: w <= 768, isTablet: w > 768 && w <= 1024 };
}

/* ══════════════════════════════════════════════════════════
   BRAINMAP ISOTIPO — dual-spiral canvas mark
══════════════════════════════════════════════════════════ */
export function BrainmapIsotypo({ size = 420 }) {
  const cvs = useRef(null);
  const rot = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2;
    const maxR = cx * 0.79;
    const TURNS = 2.8, STEPS = 400;

    function drawSpiral(a0, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.65;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i <= STEPS; i++) {
        const t = i / STEPS;
        const theta = t * TURNS * Math.PI * 2;
        const r = 9 + (maxR - 9) * t;
        const x = cx + r * Math.cos(theta + a0 + rot.current);
        const y = cy + r * Math.sin(theta + a0 + rot.current);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    function drawNodes(a0, color, glowCol, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      for (const t of [0.14, 0.32, 0.52, 0.72, 0.88]) {
        const theta = t * TURNS * Math.PI * 2;
        const r = 9 + (maxR - 9) * t;
        const x = cx + r * Math.cos(theta + a0 + rot.current);
        const y = cy + r * Math.sin(theta + a0 + rot.current);
        const nr = 2.2 + t * 3.8;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, nr * 5.5);
        grd.addColorStop(0, glowCol);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, nr * 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, nr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function frame() {
      ctx.clearRect(0, 0, size, size);

      /* ambient glow */
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
      bg.addColorStop(0,   'rgba(243,169,139,.07)');
      bg.addColorStop(.55, 'rgba(201,149,106,.03)');
      bg.addColorStop(1,   'transparent');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.arc(cx, cy, cx, 0, Math.PI * 2); ctx.fill();

      /* guide rings */
      ctx.save(); ctx.globalAlpha = .055; ctx.strokeStyle = '#A8A8AA'; ctx.lineWidth = 1;
      for (const rr of [cx*.33, cx*.57, cx*.80]) {
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI*2); ctx.stroke();
      }
      ctx.restore();

      drawSpiral(0,        '#A8A8AA', .68);
      drawNodes(0,         '#B6B6B8', 'rgba(168,168,170,.26)', .85);
      drawSpiral(Math.PI,  '#C9956A', .70);
      drawNodes(Math.PI,   '#D4A47C', 'rgba(201,149,106,.30)', .85);

      /* centre core */
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      core.addColorStop(0,   'rgba(243,169,139,.55)');
      core.addColorStop(.45, 'rgba(201,149,106,.24)');
      core.addColorStop(1,   'transparent');
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI*2); ctx.fill();

      ctx.fillStyle = '#C9956A';
      ctx.beginPath(); ctx.arc(cx, cy, 6.5, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.92)';
      ctx.beginPath(); ctx.arc(cx, cy, 2.5, 0, Math.PI*2); ctx.fill();

      rot.current += .0032;
      raf.current = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(raf.current);
  }, [size]);

  return <canvas ref={cvs} style={{ display: 'block' }} />;
}

/* ══════════════════════════════════════════════════════════
   NODE NETWORK — animated neural background
══════════════════════════════════════════════════════════ */
export function NodeNetCanvas({ width, height }) {
  const cvs  = useRef(null);
  const data = useRef({ nodes: [], raf: null });

  useEffect(() => {
    if (!width || !height) return;
    const canvas = cvs.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = width  + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const N = 54;
    data.current.nodes = Array.from({ length: N }, () => ({
      x: Math.random() * width,  y: Math.random() * height,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: 1.1 + Math.random() * 1.4,
    }));

    const MAX = 168;
    function frame() {
      ctx.clearRect(0, 0, width, height);
      const ns = data.current.nodes;
      for (const n of ns) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -35) n.x = width+35; else if (n.x > width+35) n.x = -35;
        if (n.y < -35) n.y = height+35; else if (n.y > height+35) n.y = -35;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i+1; j < N; j++) {
          const dx = ns[j].x - ns[i].x, dy = ns[j].y - ns[i].y;
          const d2 = dx*dx + dy*dy;
          if (d2 < MAX*MAX) {
            const a = (1 - Math.sqrt(d2)/MAX) * .11;
            ctx.strokeStyle = `rgba(168,168,170,${a.toFixed(3)})`;
            ctx.lineWidth = .75;
            ctx.beginPath(); ctx.moveTo(ns[i].x, ns[i].y); ctx.lineTo(ns[j].x, ns[j].y); ctx.stroke();
          }
        }
      }
      for (const n of ns) {
        ctx.fillStyle = 'rgba(168,168,170,.30)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2); ctx.fill();
      }
      data.current.raf = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(data.current.raf);
  }, [width, height]);

  return <canvas ref={cvs} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}

/* ══════════════════════════════════════════════════════════
   NAV BAR — glassmorphic sticky
══════════════════════════════════════════════════════════ */
export function NavBar() {
  const { isMobile } = useViewport();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);
  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, menuOpen]);

  const lk = (lbl, id, mobile, href) => (
    <a key={lbl}
      href={href ? href : id ? `#${id}` : '#'}
      onClick={(href || id) ? () => setMenuOpen(false) : e => e.preventDefault()}
      style={mobile ? {
        fontFamily:'var(--font-subtitle)', fontSize:21, fontWeight:600,
        color:'var(--color-text-primary)', textDecoration:'none', display:'block',
        padding:'15px 2px', borderBottom:'1px solid var(--color-border)',
      } : { fontFamily:'var(--font-body)', fontSize:14, fontWeight:500,
                color:'var(--color-text-secondary)', textDecoration:'none',
                transition:'color .2s ease', cursor:'pointer' }}
      onMouseEnter={mobile ? undefined : e => e.currentTarget.style.color='var(--color-text-primary)'}
      onMouseLeave={mobile ? undefined : e => e.currentTarget.style.color='var(--color-text-secondary)'}>
      {lbl}
    </a>
  );

  return (
    <>
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:200, height:72,
      display:'flex', alignItems:'center', padding: isMobile ? '0 20px' : '0 56px', justifyContent:'space-between',
      background:'rgba(251,251,250,.88)',
      backdropFilter:'blur(18px) saturate(180%)',
      WebkitBackdropFilter:'blur(18px) saturate(180%)',
      borderBottom: scrolled ? '1px solid rgba(30,30,31,.07)' : '1px solid transparent',
      transition:'border-color .3s ease',
    }}>
      {/* Imagotipo */}
      <div onClick={() => { setMenuOpen(false); window.scrollTo({ top:0, behavior:'smooth' }); }}
        style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', minWidth:0 }}>
        <img src="/assets/logo-brainmap-clean.webp" alt="brainmap" width={50} height={50} loading="eager" style={{
          width:50, height:50, flexShrink:0, objectFit:'contain', display:'block',
        }} />
        <span style={{ fontFamily:'var(--font-display)', fontSize:21, fontWeight:700,
                        letterSpacing:'-0.04em', color:'var(--color-text-primary)', whiteSpace:'nowrap' }}>
          brainmap
        </span>
        {!isMobile && (
          <span style={{ fontFamily:'var(--font-body)', fontSize:10, fontWeight:500,
                          letterSpacing:'.05em', color:'var(--color-text-muted)',
                          border:'1px solid var(--color-border)', borderRadius:4, padding:'2px 7px',
                          marginLeft:2, whiteSpace:'nowrap' }}>
            Escalabilidad &amp; Agencia IA
          </span>
        )}
      </div>

      {isMobile ? (
        <button onClick={() => setMenuOpen(o => !o)} aria-label="Menú" style={{
          width:40, height:40, borderRadius:'50%', border:'none', flexShrink:0,
          background:'var(--color-canvas)', boxShadow:'var(--shadow-neumorph-sm)',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        }}>
          <i className={menuOpen ? 'ph ph-x' : 'ph ph-list'} style={{ fontSize:20, color:'var(--color-text-primary)' }} />
        </button>
      ) : (
        <>
          {/* Links */}
          <div style={{ display:'flex', gap:36 }}>
            {lk('Servicios','servicios')}
            {lk('Nosotros','',false,'/nosotros')}
            {lk('Blog','',false,'/blog')}
          </div>

          {/* CTA neumórfico */}
          <a href="#hablemos"
            style={{ fontFamily:'var(--font-body)', fontSize:14, fontWeight:500,
                      color:'var(--color-text-primary)', background:'var(--color-canvas)',
                      border:'none', borderRadius:'var(--radius-full)', padding:'10px 26px',
                      cursor:'pointer', boxShadow:'var(--shadow-neumorph)', textDecoration:'none',
                      display:'inline-block',
                      transition:'box-shadow .25s ease, transform .2s ease' }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-neumorph-lg)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-neumorph)'; }}
            onMouseDown={e=>{ e.currentTarget.style.transform='translateY(1px)'; e.currentTarget.style.boxShadow='var(--shadow-neumorph-inset)'; }}
            onMouseUp={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-neumorph-lg)'; }}>
            Hablemos
          </a>
        </>
      )}
    </nav>

    {isMobile && (
      <div style={{
        position:'fixed', top:72, left:0, right:0, zIndex:199,
        background:'var(--color-canvas)',
        maxHeight: menuOpen ? 'calc(100vh - 72px)' : 0,
        overflow:'hidden', transition:'max-height .32s cubic-bezier(.25,.46,.45,.94)',
        boxShadow: menuOpen ? '0 16px 40px rgba(0,0,0,.12)' : 'none',
      }}>
        <div style={{ display:'flex', flexDirection:'column', padding:'8px 24px 28px' }}>
          {lk('Servicios','servicios', true)}
          {lk('Nosotros','', true, '/nosotros')}
          {lk('Blog','', true, '/blog')}
          <a href="#hablemos" onClick={() => setMenuOpen(false)}
            style={{ marginTop:20, fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                      color:'#fff', background:'var(--color-text-primary)',
                      border:'none', borderRadius:'var(--radius-full)', padding:'15px 28px',
                      cursor:'pointer', width:'100%', textDecoration:'none', textAlign:'center',
                      display:'block', boxSizing:'border-box' }}>
            Hablemos
          </a>
        </div>
      </div>
    )}
    </>
  );
}

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
   KARIN CHAT — hook: sessionId, webhook I/O, message state.
   Conecta con el agente n8n. sessionId vive solo en memoria
   del componente (no localStorage) durante la sesión de la
   página — no se reinicia al navegar entre secciones.
══════════════════════════════════════════════════════════ */
const KARIN_WEBHOOK_URL = 'https://brainmap-n8n2.onq6ef.easypanel.host/webhook/test-chat-agent';
const KARIN_TIMEOUT_MS = 18000;
const KARIN_ERROR_TEXT = 'No pudimos conectar con Karin, intenta de nuevo.';

function uuidv4() {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function useKarinChat() {
  const [sessionId] = useState(() => uuidv4());
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { from:'karin'|'user', text, error? }
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const initSent = useRef(false);
  const lastForm = useRef(null);

  async function callKarin(payload) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), KARIN_TIMEOUT_MS);
    try {
      const res = await fetch(KARIN_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return (data && data.reply) ? data.reply : 'Recibido — sigamos.';
    } finally {
      clearTimeout(timer);
    }
  }

  async function runInit(form) {
    setStatus('loading');
    try {
      const reply = await callKarin({
        event: 'init',
        sessionId,
        nombre: form.name,
        telefono: form.phone,
        email: form.email,
        necesidad: form.msg,
      });
      setMessages([{ from: 'karin', text: reply }]);
      setStatus('idle');
    } catch (err) {
      setMessages([{ from: 'karin', text: KARIN_ERROR_TEXT, error: true }]);
      setStatus('error');
    }
  }

  function startChat(form) {
    setOpen(true);
    if (initSent.current) return; // ya se envió el init de esta sesión — no duplicar saludo
    initSent.current = true;
    lastForm.current = form;
    runInit(form);
  }

  function retryInit() {
    if (!lastForm.current) return;
    setMessages([]);
    runInit(lastForm.current);
  }

  async function sendMessage(text) {
    const clean = (text || '').trim();
    if (!clean || status === 'loading') return;
    setMessages(m => [...m, { from: 'user', text: clean }]);
    setStatus('loading');
    try {
      const reply = await callKarin({ event: 'message', sessionId, message: clean });
      setMessages(m => [...m, { from: 'karin', text: reply }]);
      setStatus('idle');
    } catch (err) {
      setMessages(m => [...m, { from: 'karin', text: KARIN_ERROR_TEXT, error: true }]);
      setStatus('error');
    }
  }

  function closeChat() { setOpen(false); }

  return { sessionId, open, messages, status, startChat, sendMessage, closeChat, retryInit };
}

function TypingDots() {
  return (
    <div style={{ display:'flex', gap:5, padding:'14px 18px', background:'var(--color-canvas-subtle)', borderRadius:'4px 18px 18px 18px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:'var(--color-accent)', animation:`dotBounce 1.1s ease infinite ${i*.18}s` }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CHAT OVERLAY — Karin
══════════════════════════════════════════════════════════ */
export function ChatOverlay({ chat }) {
  const { messages, status, sendMessage, closeChat, retryInit } = chat;
  const [text, setText] = useState('');
  const { isMobile } = useViewport();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  function handleSend() {
    if (!text.trim() || status === 'loading') return;
    sendMessage(text);
    setText('');
  }
  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  const showTypingAfterMsgs = status === 'loading' && messages.length > 0;
  const showTypingFirstLoad = status === 'loading' && messages.length === 0;
  const lastMsg = messages[messages.length - 1];
  const showRetryInit = messages.length === 1 && lastMsg && lastMsg.error && status !== 'loading';

  return (
    <div onClick={e => { if (e.target === e.currentTarget) closeChat(); }} style={{
      position:'fixed', inset:0, zIndex:600,
      display:'flex', alignItems:'flex-end', justifyContent:'flex-end', padding: isMobile ? 0 : 28,
      background:'rgba(30,30,31,.12)', backdropFilter:'blur(5px)',
      WebkitBackdropFilter:'blur(5px)', animation:'fadeIn .3s ease',
    }}>
      <div style={{
        width: isMobile ? '100%' : 380, background:'var(--color-canvas)',
        borderRadius: isMobile ? 'var(--radius-2xl) var(--radius-2xl) 0 0' : 'var(--radius-2xl)', boxShadow:'var(--shadow-xl)',
        overflow:'hidden', display:'flex', flexDirection:'column',
        maxHeight: isMobile ? '82vh' : '72vh', animation:'slideUp .4s cubic-bezier(.25,.46,.45,.94)',
      }}>
        {/* header */}
        <div style={{
          padding:'18px 20px', background:'var(--color-text-primary)',
          display:'flex', alignItems:'center', gap:14,
        }}>
          <div style={{
            width:44, height:44, borderRadius:'50%', flexShrink:0,
            background:'linear-gradient(135deg, var(--color-accent) 0%, var(--color-rose-gold) 100%)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <span style={{ fontFamily:'var(--font-subtitle)', fontSize:17, fontWeight:600, color:'#fff' }}>K</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-subtitle)', fontSize:14, fontWeight:600, color:'#fff' }}>Karin</div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background: status === 'error' ? '#E07856' : '#4ADE80' }} />
              <span style={{ fontFamily:'var(--font-body)', fontSize:12, color:'rgba(255,255,255,.58)' }}>
                {status === 'loading' ? 'Karin está escribiendo…' : 'Consultora · En línea'}
              </span>
            </div>
          </div>
          <button onClick={closeChat} style={{
            background:'rgba(255,255,255,.1)', border:'none', borderRadius:'50%',
            width:32, height:32, cursor:'pointer', color:'rgba(255,255,255,.8)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, lineHeight:1,
          }}>×</button>
        </div>

        {/* messages */}
        <div ref={scrollRef} style={{
          flex:1, overflowY:'auto', padding:'18px 18px',
          display:'flex', flexDirection:'column', gap:12, minHeight:180,
        }}>
          {showTypingFirstLoad && (
            <div style={{ display:'flex', justifyContent:'flex-start' }}><TypingDots /></div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ display:'flex', justifyContent: msg.from==='karin' ? 'flex-start' : 'flex-end' }}>
              <div style={{
                maxWidth:'82%', padding:'12px 16px',
                background: msg.error ? 'rgba(224,120,86,.14)' : (msg.from==='karin' ? 'var(--color-canvas-subtle)' : 'var(--color-text-primary)'),
                color: msg.error ? '#B8502F' : (msg.from==='karin' ? 'var(--color-text-primary)' : '#fff'),
                borderRadius: msg.from==='karin' ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.55,
                animation:'fadeMsg .35s ease',
              }}>{msg.text}</div>
            </div>
          ))}
          {showTypingAfterMsgs && (
            <div style={{ display:'flex', justifyContent:'flex-start' }}><TypingDots /></div>
          )}
          {showRetryInit && (
            <div style={{ display:'flex', justifyContent:'flex-start' }}>
              <button onClick={retryInit} style={{
                fontFamily:'var(--font-body)', fontSize:13, fontWeight:600,
                color:'var(--color-text-primary)', background:'var(--color-canvas-subtle)',
                border:'none', borderRadius:'var(--radius-full)', padding:'9px 18px', cursor:'pointer',
              }}>Reintentar</button>
            </div>
          )}
        </div>

        {/* input bar */}
        <div style={{
          padding:'12px 14px', borderTop:'1px solid var(--color-border)',
          display:'flex', gap:10, alignItems:'center',
        }}>
          <input placeholder="Escribe tu respuesta..." value={text}
            onChange={e => setText(e.target.value)} onKeyDown={handleKey}
            disabled={status === 'loading'}
            style={{
              flex:1, fontFamily:'var(--font-body)', fontSize:14,
              color:'var(--color-text-primary)', background:'var(--color-canvas-subtle)',
              border:'none', borderRadius:'var(--radius-full)', padding:'10px 16px', outline:'none',
              opacity: status === 'loading' ? .6 : 1,
            }} />
          <button onClick={handleSend} disabled={status === 'loading' || !text.trim()} style={{
            width:38, height:38, background:'var(--color-text-primary)',
            border:'none', borderRadius:'50%', cursor: (status === 'loading' || !text.trim()) ? 'default' : 'pointer',
            opacity: (status === 'loading' || !text.trim()) ? .5 : 1,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
          }}>
            <i className="ph ph-arrow-right" style={{ fontSize:16, color:'#fff' }} />
          </button>
        </div>
      </div>
    </div>
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

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
export function Footer() {
  const { isMobile } = useViewport();
  return (
    <footer style={{
      padding: isMobile ? '36px 24px' : '40px 56px', background:'var(--color-canvas)',
      borderTop:'1px solid var(--color-border)',
      display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems:'center',
      gap: isMobile ? 20 : 0,
      position:'relative', zIndex:1,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <img src="/assets/logo-brainmap-clean.webp" alt="brainmap" width={38} height={38} loading="lazy" style={{
          width:38, height:38, objectFit:'contain', display:'block',
        }} />
        <span style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700,
                        letterSpacing:'-0.04em', color:'var(--color-text-primary)' }}>brainmap</span>
      </div>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap', justifyContent:'center' }}>
        {[['Servicios','#servicios'],['Nosotros','/nosotros'],['Blog','/blog'],['Contacto','#hablemos']].map(([lbl, href]) => (
          <a key={lbl} href={href} style={{
            fontFamily:'var(--font-body)', fontSize:13,
            color:'var(--color-text-muted)', textDecoration:'none', transition:'color .2s ease',
          }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--color-text-secondary)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--color-text-muted)'}>
            {lbl}
          </a>
        ))}
      </div>
      <span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)' }}>
        Ingeniería Empática · © 2026
      </span>
    </footer>
  );
}
