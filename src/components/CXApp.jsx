/* CXApp.jsx — root composition for the "Experiencia de Clientes y Diseño
   del Futuro" service page (ported from cx-app.jsx) */
import {
  NavBar, Footer, ChatOverlay, ContactSection, useKarinChat,
} from './shared.jsx';
import {
  CXServiceHero, CXProblemSection, CXMethodSection,
  CXSolutionsGridSection, CXBeforeAfterSection, CXFaqSection,
} from './cx.jsx';

export default function CXApp({ heroImage }) {
  const chat = useKarinChat();

  return (
    <>
      <NavBar breadcrumb="Experiencia de Clientes y Diseño del Futuro" />
      <CXServiceHero heroImage={heroImage} />
      <CXProblemSection />
      <CXMethodSection />
      <CXSolutionsGridSection />
      <CXBeforeAfterSection />
      <CXFaqSection />
      <ContactSection
        chat={chat}
        title="Diseñemos la experiencia que tu cliente recordará."
        subtitle="Analizamos tu journey actual, encontramos la fricción real y diseñamos una experiencia orquestada de principio a fin — para clientes y para tu equipo."
        bullets={['Diagnóstico gratuito de tu journey actual','Propuesta a la medida de tus canales y equipo','Sin contratos forzosos ni suscripciones']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
