// Import des styles SCSS
import './styles/main.scss';

// Navigation
/* const nav = document.querySelector('.site-nav');
//Hidden if scroll 0
window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    nav.classList.add('hidden');
    console.log('hidden');
  } else {
    nav.classList.remove('hidden');
    console.log('visible');
  }
}); */

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('.site-nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Fermer le menu mobile si ouvert
      const navMenu = document.querySelector('.site-nav__menu');
      const navToggle = document.querySelector('.site-nav__toggle');
      if (navMenu && navMenu.classList.contains('site-nav__menu--open')) {
        navMenu.classList.remove('site-nav__menu--open');
        navToggle.classList.remove('site-nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Toggle menu mobile
const navToggle = document.querySelector('.site-nav__toggle');
const navMenu = document.querySelector('.site-nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('site-nav__menu--open');
    navToggle.classList.toggle('site-nav__toggle--active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// Mettre à jour le lien actif au scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.site-nav__link');

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100;
  let currentSectionId = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSectionId = sectionId;
    }
  });

  if (!currentSectionId) return;

  const activeLink = Array.from(navLinks).find(
    (link) => link.getAttribute('href') === `#${currentSectionId}`
  );

  if (!activeLink) return;

  navLinks.forEach((link) => {
    link.classList.remove('site-nav__link--active');
  });
  activeLink.classList.add('site-nav__link--active');
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Appel initial

// Compte a rebours
const countdown = document.querySelector('[data-countdown-target]');
if (countdown) {
  const targetValue = countdown.dataset.countdownTarget;
  const targetDate = new Date(targetValue);
  const dayEl = countdown.querySelector('[data-unit=\"days\"]');
  const hourEl = countdown.querySelector('[data-unit=\"hours\"]');
  const minuteEl = countdown.querySelector('[data-unit=\"minutes\"]');
  const secondEl = countdown.querySelector('[data-unit=\"seconds\"]');

  if (!Number.isNaN(targetDate.getTime())) {
    const pad = (value) => String(value).padStart(2, '0');
    let timer = null;

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (dayEl) dayEl.textContent = '00';
        if (hourEl) hourEl.textContent = '00';
        if (minuteEl) minuteEl.textContent = '00';
        if (secondEl) secondEl.textContent = '00';
        countdown.classList.add('countdown__timer--ended');
        if (timer) {
          clearInterval(timer);
        }
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (dayEl) dayEl.textContent = pad(days);
      if (hourEl) hourEl.textContent = pad(hours);
      if (minuteEl) minuteEl.textContent = pad(minutes);
      if (secondEl) secondEl.textContent = pad(seconds);
    };

    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  }
}
