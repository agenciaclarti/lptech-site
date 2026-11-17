/* Configuração simples: informe apenas os dígitos, incluindo DDI, para ativar o WhatsApp. */
const WHATSAPP_NUMBER = '5581985187208';
const WHATSAPP_MESSAGE = 'Olá! Quero conhecer as soluções da LP Tech para o meu estabelecimento.';

const contactButtons = document.querySelectorAll('[data-contact]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const header = document.querySelector('[data-header]');
const contactStatus = document.querySelector('[data-contact-status]');
const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
if (whatsappNumber && contactStatus) contactStatus.textContent = 'Atendimento comercial via WhatsApp';

function closeMenu() {
  navigation.classList.remove('nav-links--open');
  document.body.classList.remove('menu-is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}

contactButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank', 'noopener');
      return;
    }
  });
});

menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('nav-links--open');
  document.body.classList.toggle('menu-is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('[data-close-menu]').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

document.querySelector('[data-year]').textContent = new Date().getFullYear();
const updateHeader = () => header.classList.toggle('site-header--scrolled', window.scrollY > 12);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('.reveal');
if (motionQuery.matches || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}
