/* ─────────────────────────────────────────────────────────────
   shared.jsx — Reusable pieces for Brainmap SERVICE subpages
   (NavBar / Footer / ChatOverlay / ContactSection / hooks)
   Ported from shared-bundle.jsx (Claude Design handoff) to an
   ES module consumed as Astro/React islands.
   ───────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from 'react';

const HOME = '/';

/* ── Utility: smooth scroll to a same-page anchor ────────── */
export function goTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ── Hook: reveal on scroll ──────────────────────────────── */
export function useReveal(delay = 0) {
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

export const revStyle = (vis, dx = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : `translate(${dx}px, 20px)`,
  transition: 'opacity var(--duration-enter,.65s) var(--ease-out), transform var(--duration-enter,.65s) var(--ease-out)',
});

/* ── Hook: viewport breakpoints ──────────────────────────── */
export function useViewport() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return { width: w, isMobile: w <= 768, isTablet: w > 768 && w <= 1024 };
}

/* ══════════════════════════════════════════════════════════
   NAV BAR — glassmorphic sticky (subpage mode: links back to
   the sections of the home page, "Contacto" scrolls local)
══════════════════════════════════════════════════════════ */
export function NavBar({ breadcrumb, badge }) {
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

  const links = [
    { lbl:'Servicios', href:`${HOME}#servicios` },
    { lbl:'Nosotros',   href:'/nosotros' },
    { lbl:'Blog',       href:'/blog' },
  ];

  const lk = (l, mobile) => (
    <a key={l.lbl}
      href={l.id ? '#' : l.href}
      onClick={l.id ? e => { e.preventDefault(); setMenuOpen(false); goTo(l.id); } : () => setMenuOpen(false)}
      style={mobile ? {
        fontFamily:'var(--font-subtitle)', fontSize:21, fontWeight:600,
        color:'var(--color-text-primary)', textDecoration:'none', display:'block',
        padding:'15px 2px', borderBottom:'1px solid var(--color-border)',
      } : { fontFamily:'var(--font-body)', fontSize:14, fontWeight:500,
                color:'var(--color-text-secondary)', textDecoration:'none',
                transition:'color .2s ease', cursor:'pointer' }}
      onMouseEnter={mobile ? undefined : e => e.currentTarget.style.color='var(--color-text-primary)'}
      onMouseLeave={mobile ? undefined : e => e.currentTarget.style.color='var(--color-text-secondary)'}>
      {l.lbl}
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
      {/* Imagotipo + breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap: isMobile ? 8 : 14, minWidth:0 }}>
        <a href={HOME} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', minWidth:0, textDecoration:'none' }}>
          <img src="/assets/logo-brainmap-clean.webp" alt="brainmap" width={50} height={50} loading="eager" style={{
            width:50, height:50, flexShrink:0, objectFit:'contain', display:'block',
          }} />
          {!isMobile && (
            <span style={{ fontFamily:'var(--font-display)', fontSize:21, fontWeight:700,
                            letterSpacing:'-0.04em', color:'var(--color-text-primary)', whiteSpace:'nowrap' }}>
              brainmap
            </span>
          )}
        </a>
        {breadcrumb && !isMobile && (
          <>
            <span style={{ color:'var(--color-text-muted)', fontSize:14 }}>/</span>
            <span style={{
              fontFamily:'var(--font-body)', fontSize:13, fontWeight:500,
              color:'var(--color-text-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
            }}>{breadcrumb}</span>
          </>
        )}
        {badge && !isMobile && (
          <span style={{ fontFamily:'var(--font-body)', fontSize:10, fontWeight:500,
                          letterSpacing:'.05em', color:'var(--color-text-muted)',
                          border:'1px solid var(--color-border)', borderRadius:4, padding:'2px 7px',
                          marginLeft:2, whiteSpace:'nowrap' }}>
            {badge}
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
          <div style={{ display:'flex', gap:36 }}>
            {links.map(l => lk(l))}
          </div>

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
          {links.map(l => lk(l, true))}
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
        <div style={{ padding:'18px 20px', background:'var(--color-text-primary)', display:'flex', alignItems:'center', gap:14 }}>
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

        <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding:'18px 18px', display:'flex', flexDirection:'column', gap:12, minHeight:180 }}>
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

        <div style={{ padding:'12px 14px', borderTop:'1px solid var(--color-border)', display:'flex', gap:10, alignItems:'center' }}>
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
   CONTACT — reusable conversion hub (title/subtitle/bullets
   are configurable per service page)
══════════════════════════════════════════════════════════ */
export function ContactSection({ chat, eyebrow = 'Hablemos', title, subtitle, bullets }) {
  const [ref, vis] = useReveal(0);
  const { isMobile } = useViewport();
  const [form, setForm]   = useState({ name:'', phone:'', email:'', company:'', msg:'' });
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

  const finalBullets = bullets || ['Diagnóstico gratuito','Propuesta técnica y a la medida','Sin contratos forzosos ni suscripciones'];

  return (
    <section id="hablemos" style={{
      padding: isMobile ? '72px 24px' : '132px 56px', background:'var(--color-text-primary)',
      position:'relative', overflow:'hidden', zIndex:1,
    }}>
      <video autoPlay muted playsInline loop src="/assets/hablemos-bg.mp4" style={{
        position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0,
      }} />
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'rgba(251,251,250,.82)' }} />
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
        <div>
          <span style={{
            fontFamily:'var(--font-body)', fontSize:11, fontWeight:600,
            letterSpacing:'.08em', textTransform:'uppercase',
            color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
            border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:9999,
          }}>{eyebrow}</span>

          <h2 style={{
            fontFamily:'var(--font-display)', fontSize: isMobile ? 'clamp(26px,7.5vw,34px)' : 'clamp(34px,3.8vw,52px)',
            fontWeight:700, letterSpacing:'-0.036em', lineHeight:1.14,
            color:'var(--color-text-primary)', margin:'20px 0 18px',
          }}>
            {title || 'Diseñemos tu infraestructura del futuro.'}
          </h2>

          <p style={{
            fontFamily:'var(--font-body)', fontSize:16, lineHeight:1.68,
            color:'var(--color-text-secondary)', margin:'0 0 36px', maxWidth:420,
          }}>
            {subtitle || 'Analizamos tu operación, identificamos la fricción real y presentamos un plan concreto. Sin propuestas genéricas.'}
          </p>

          {finalBullets.map((t,i) => (
            <div key={i} style={{ display:'flex', gap:14, alignItems:'center', marginBottom:14 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--color-accent)', flexShrink:0 }} />
              <span style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-secondary)' }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{
          background:'var(--color-canvas-elevated)', borderRadius:'var(--radius-2xl)',
          padding: isMobile ? '26px' : '40px', boxShadow:'var(--shadow-lg)',
        }}>
          {sent ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, padding:'48px 24px', textAlign:'center' }}>
              <i className="ph-duotone ph-check-circle" style={{ fontSize:60, color:'var(--color-accent)' }} />
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, margin:0, color:'var(--color-text-primary)' }}>¡Mensaje enviado!</h3>
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
                  {lbl('Empresa')}
                  <input placeholder="Ej: Comercial Andina SpA"
                    value={form.company} onChange={set('company')}
                    style={inputSt} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 20 : 16 }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:6, flex:1 }}>
                    {lbl('Correo Electrónico')}
                    <input type="email" required placeholder="Ej: usuario@gmail.com"
                      value={form.email} onChange={set('email')}
                      style={inputSt} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6, flex:1 }}>
                    {lbl('Teléfono')}
                    <input type="tel" placeholder="Ej:+56 9 1234 5678"
                      value={form.phone} onChange={set('phone')}
                      style={inputSt} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {lbl('¿Qué proceso quieres automatizar?')}
                  <textarea rows={4} placeholder="Cuéntanos qué tareas, herramientas o cuellos de botella quieres resolver."
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
      <a href={HOME} style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <img src="/assets/logo-brainmap-clean.webp" alt="brainmap" width={38} height={38} loading="lazy" style={{
          width:38, height:38, objectFit:'contain', display:'block',
        }} />
        <span style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700,
                        letterSpacing:'-0.04em', color:'var(--color-text-primary)' }}>brainmap</span>
      </a>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap', justifyContent:'center' }}>
        {[['Servicios', `${HOME}#servicios`], ['Nosotros', '/nosotros'], ['Blog', '/blog'], ['Contacto', '#hablemos']].map(([lbl, href]) => (
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
