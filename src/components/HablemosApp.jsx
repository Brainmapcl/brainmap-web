/* ─────────────────────────────────────────────────────────────
   HablemosApp.jsx — página standalone del flujo de continuidad
   correo → chat (Karin) para leads del checklist de costuras.
   Sin NavBar ni Footer con links de salida — un solo objetivo,
   mismo criterio que checklist-costuras.astro.
   ───────────────────────────────────────────────────────────── */
import { useState, useEffect } from 'react';
import { ChatOverlay, useKarinChat, useViewport } from './shared.jsx';
import { LeadFormFields } from './LeadFormFields.jsx';

const LEAD_LOOKUP_URL  = 'https://brainmap-n8n2.onq6ef.easypanel.host/webhook/lead-lookup';
const LEAD_RESUMEN_URL = 'https://brainmap-n8n2.onq6ef.easypanel.host/webhook/lead-resumen';

function Spinner() {
  return (
    <div style={{ display:'flex', justifyContent:'center', padding:'64px 0' }}>
      <div style={{
        width:32, height:32, borderRadius:'50%',
        border:'3px solid var(--color-border)', borderTopColor:'var(--color-text-accent)',
        animation:'hablemos-spin .8s linear infinite',
      }} />
      <style>{`@keyframes hablemos-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function HablemosApp() {
  const chat = useKarinChat();
  const { isMobile } = useViewport();
  const [loading, setLoading] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Continuidad correo → chat: si el visitante llega desde el link de un correo de
  // nurturing (?lead=<token_publico>), precarga sus datos y un resumen de lo que ya
  // contó, generado al vuelo (no se cachea; se recalcula en cada carga de página).
  useEffect(() => {
    const leadToken = new URLSearchParams(window.location.search).get('lead');
    if (!leadToken) return;

    let cancelled = false;
    setLoading(true);

    const lookup = fetch(`${LEAD_LOOKUP_URL}?token=${encodeURIComponent(leadToken)}`)
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null);

    const resumen = fetch(`${LEAD_RESUMEN_URL}?token=${encodeURIComponent(leadToken)}`)
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null);

    Promise.all([lookup, resumen]).then(([lookupData, resumenData]) => {
      if (cancelled) return;
      if (lookupData) {
        setInitialData({
          name: lookupData.nombre || '',
          phone: lookupData.telefono || '',
          email: lookupData.email || '',
          msg: (resumenData && resumenData.resumen) || '',
        });
        setPrefilled(true);
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <header style={{ padding:'28px 32px', display:'flex', alignItems:'center', gap:10 }}>
        <a href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <img src="/assets/logo-brainmap-clean.webp" alt="brainmap" width={32} height={32}
            style={{ width:32, height:32, objectFit:'contain', display:'block' }} />
          <span style={{
            fontFamily:'var(--font-display)', fontWeight:600, fontSize:18,
            letterSpacing:'-0.02em', color:'var(--color-text-primary)',
          }}>brainmap</span>
        </a>
      </header>

      <main style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 20px 60px' }}>
        <div style={{ width:'100%', maxWidth:520 }}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {prefilled && (
                <div style={{
                  display:'flex', alignItems:'center', gap:8, justifyContent:'center',
                  background:'var(--color-accent-subtle)', border:'1px solid var(--color-border-accent)',
                  borderRadius:'var(--radius-full)', padding:'8px 16px', margin:'0 auto 24px', width:'fit-content',
                  fontSize:12.5, color:'var(--color-text-accent)', fontWeight:500,
                }}>
                  <i className="ph ph-check" style={{ fontSize:14 }} />
                  Ya completamos tus datos por ti
                </div>
              )}

              <div style={{ textAlign:'center', marginBottom:28 }}>
                <span style={{
                  display:'inline-flex', fontSize:11, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase',
                  color:'var(--color-accent-intense)', background:'var(--color-accent-subtle)',
                  border:'1px solid var(--color-border-accent)', padding:'4px 14px', borderRadius:'var(--radius-full)',
                }}>Hablemos</span>
                <h1 style={{
                  fontFamily:'var(--font-display)', fontWeight:600, fontSize:'clamp(26px,3.4vw,34px)',
                  letterSpacing:'-0.02em', lineHeight:1.18, margin:'16px 0 10px', color:'var(--color-text-primary)',
                }}>Cuéntanos tu caso y partimos desde ahí</h1>
                <p style={{
                  color:'var(--color-text-secondary)', fontSize:15, lineHeight:1.6,
                  margin:'0 auto', maxWidth:400,
                }}>
                  Revisa que tus datos estén correctos y cuéntanos lo que necesites — nuestro equipo (con ayuda de Karin) responde al toque.
                </p>
              </div>

              <div style={{
                background:'var(--color-canvas-elevated)', borderRadius:'var(--radius-2xl)',
                padding: isMobile ? '24px 20px' : '36px', boxShadow:'var(--shadow-lg)',
              }}>
                <LeadFormFields chat={chat} initialData={initialData || undefined} eventContext="contacto_hablemos_nurturing" />
              </div>
            </>
          )}
        </div>
      </main>

      <footer style={{ padding:'24px', textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-text-muted)', margin:0 }}>
          brainmap · Ingeniería Empática · © 2026
        </p>
      </footer>

      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
