import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// NOTA: se probó redirigir window.scrollTo() a lenis.scrollTo() para que los
// saltos programáticos (goTo(), NavBar, Pagination, etc.) quedaran en sync
// con el loop de Lenis, pero en la práctica esto rompía esos saltos por
// completo (Lenis los revertía al frame siguiente). Se removió: con Lenis en
// modo no-virtual, window.scrollTo() nativo ya funciona correctamente y
// Lenis se resincroniza solo leyendo la posición real en cada frame.

function setupScrollAnimations() {
  const sections = Array.from(document.querySelectorAll('section'));

  sections.forEach((section, i) => {
    if (i === 0) {
      // Entrada del Hero — scale + opacity, no ligada al scroll.
      gsap.fromTo(
        section,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out', delay: 0.1, transformOrigin: 'center center' }
      );
      return;
    }
    gsap.fromTo(
      section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%' },
      }
    );
  });

  ScrollTrigger.refresh();
}

if (document.readyState === 'complete') {
  setupScrollAnimations();
} else {
  window.addEventListener('load', setupScrollAnimations);
}

// Los links internos de las secciones usan window.scrollTo — mantenemos
// ScrollTrigger sincronizado también tras esos saltos programáticos.
document.addEventListener('scroll', () => ScrollTrigger.update(), { passive: true });
