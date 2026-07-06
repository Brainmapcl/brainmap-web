/* HiperApp.jsx — root composition for the Hiperautomatización service page
   (ported from hiper-app.jsx) */
import { NavBar, Footer, ChatOverlay, ContactSection, useKarinChat } from './shared.jsx';
import {
  ServiceHero, ProblemSection, MethodSection,
  SolutionsGridSection, BeforeAfterSection, FaqSection,
} from './hiper.jsx';

export default function HiperApp({ heroImage }) {
  const chat = useKarinChat();
  return (
    <>
      <NavBar breadcrumb="Hiperautomatización de Procesos" />
      <ServiceHero heroImage={heroImage} />
      <ProblemSection />
      <MethodSection />
      <SolutionsGridSection />
      <BeforeAfterSection />
      <FaqSection />
      <ContactSection
        chat={chat}
        title="Diseñemos tu stack de automatización."
        subtitle="Analizamos tu operación actual, priorizamos la fricción real y te presentamos la arquitectura que necesitas — sin propuestas genéricas."
        bullets={['Diagnóstico gratuito de tu operación','Arquitectura a la medida de tu stack actual','Sin contratos forzosos ni suscripciones']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
