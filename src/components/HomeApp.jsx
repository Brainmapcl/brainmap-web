/* HomeApp.jsx — root composition for the home page (ported from home-app.jsx) */
import { NavBar, Footer, ChatOverlay, useKarinChat } from './shared.jsx';
import {
  HeroSection, DiagnosisSection,
  ServicesSection, AdvancedGridSection,
  ContactSection,
} from './home.jsx';

export default function HomeApp({ heroImage }) {
  const chat = useKarinChat();

  return (
    <>
      <NavBar badge="Escalabilidad & Agencia IA" />
      <HeroSection heroImage={heroImage} />
      <DiagnosisSection />
      <ServicesSection />
      <AdvancedGridSection />
      <ContactSection chat={chat} />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}
