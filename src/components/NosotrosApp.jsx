/* NosotrosApp.jsx — root composition for the "Nosotros" page (ported from nosotros-app.jsx) */
import {
  NavBar, Footer, ChatOverlay, ContactSection, useKarinChat,
} from './shared.jsx';
import { AboutHero, StatsSection, TeamSection } from './nosotros.jsx';

export default function NosotrosApp({ heroImage }) {
  const chat = useKarinChat();

  return (
    <>
      <NavBar breadcrumb="Nosotros" />
      <AboutHero heroImage={heroImage} />
      <StatsSection />
      <TeamSection />
      <ContactSection
        chat={chat}
        eyebrow="Conversemos"
        title="Conoce al equipo, sin intermediarios."
        subtitle="Si quieres hablar directamente con Rodrigo o Iván antes de definir tu proyecto, escríbenos. Coordinamos una conversación personal, sin compromiso."
        bullets={['Conversación directa con los consultores','Sin necesidad de comprometerte a nada','Respuesta personal, no un formulario genérico']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
