/* ─────────────────────────────────────────────────────────────
   LeadFormFields.jsx — campos y lógica del formulario de contacto/lead.
   Sin estilos de contenedor (fondo, layout, copy) — eso lo define quien lo
   use (ContactSection en el home, HablemosApp en /hablemos).
   ───────────────────────────────────────────────────────────── */
import { useState } from 'react';

export function LeadFormFields({ chat, initialData, eventContext }) {
  const [form, setForm] = useState(initialData || { name:'', phone:'', email:'', msg:'' });
  const [sent, setSent] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {content_name: eventContext || 'contacto_generico'});
    }
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

  if (sent) {
    return (
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
    );
  }

  return (
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
  );
}
