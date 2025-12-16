/* script.js
   Menambahkan: smooth scrolling, active nav highlight,
   back-to-top button, dan collapsible info-card
*/

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('nav a'));
  const sections = Array.from(document.querySelectorAll('main section'));
  const backToTop = document.getElementById('backToTop');

  //Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Highlight active nav link on scroll
  const updateActiveNav = () => {
    const offset = window.innerHeight * 0.25; // threshold
    let currentId = sections[0].id;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top - offset <= 0) currentId = sec.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
  };

  // Back to top visibility and behavior
  const onScroll = () => {
    updateActiveNav();
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Collapsible info-card by clicking the H3
  const infoCards = Array.from(document.querySelectorAll('.info-card'));
  infoCards.forEach(card => {
    const header = card.querySelector('h3');
    if (!header) return;
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'true');

    const toggle = () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!isExpanded));
      card.querySelectorAll('p').forEach(p => p.classList.toggle('hidden'));
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Keyboard: Esc hides focus outline after clicking BackToTop
  backToTop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
  });
});
