/* SolucionesApp.jsx — root composition for the Soluciones page
   (ported from soluciones-app.jsx) */
import { useEffect } from 'react';
import { NavBar, Footer, ChatOverlay, ContactSection, useKarinChat, goTo } from './shared.jsx';
import { SolucionesHero, SolucionesIndex, SolucionesCases } from './soluciones.jsx';

export default function SolucionesApp() {
  const chat = useKarinChat();

  // Si se llega con #ancla desde el home, aterriza en el caso correcto
  useEffect(() => {
    const id = (window.location.hash || '').replace('#', '');
    if (id) setTimeout(() => goTo(id), 260);
  }, []);

  return (
    <>
      <NavBar breadcrumb="Soluciones" />
      <SolucionesHero />
      <SolucionesIndex />
      <SolucionesCases />
      <ContactSection
        chat={chat}
        eyebrow="Hablemos"
        title="¿Cuál de estas soluciones necesita tu operación?"
        subtitle="Cuéntanos cómo funciona hoy tu proceso y te decimos qué solución adoptar primero, con qué conectarla y en qué plazo puede estar operando."
        bullets={['Diagnóstico gratuito de tu caso','Se conecta a las herramientas que ya usas','Sin contratos forzosos ni suscripciones']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
