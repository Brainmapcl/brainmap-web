/* AIApp.jsx — root composition for the "Alfabetización IA" service page (ported from ai-app.jsx) */
import {
  NavBar, Footer, ChatOverlay, ContactSection, useKarinChat,
} from './shared.jsx';
import {
  AIServiceHero, AIProblemSection, AIMethodSection,
  AISolutionsGridSection, AIBeforeAfterSection, AIFaqSection,
} from './ai.jsx';

export default function AIApp({ heroImage }) {
  const chat = useKarinChat();

  return (
    <>
      <NavBar breadcrumb="Alfabetización IA" />
      <AIServiceHero heroImage={heroImage} />
      <AIProblemSection />
      <AIMethodSection />
      <AISolutionsGridSection />
      <AIBeforeAfterSection />
      <AIFaqSection />
      <ContactSection
        chat={chat}
        title="Llevemos a tu equipo a su siguiente nivel de madurez IA."
        subtitle="Medimos el punto de partida real de tu equipo y diseñamos un programa de formación y adopción a medida — sin reemplazar a nadie."
        bullets={['Diagnóstico gratuito de madurez IA','Formación práctica ajustada a tu equipo','Sin contratos forzosos ni suscripciones']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
