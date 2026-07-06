/* HomeApp.jsx — root composition for the home page (ported from home-app.jsx) */
import {
  NavBar, HeroSection, DiagnosisSection,
  ServicesSection, AdvancedGridSection,
  ContactSection, ChatOverlay, Footer, useKarinChat,
} from './home.jsx';

export default function HomeApp({ heroImage }) {
  const chat = useKarinChat();

  return (
    <>
      <NavBar />
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
