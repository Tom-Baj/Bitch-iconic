// Navigation 
const nav = document.querySelector('.site-nav');
//Hidden if scroll 0
window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    nav.classList.add('hidden');
    console.log('hidden');
  } else {
    nav.classList.remove('hidden');
    console.log('visible');
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
        behavior: 'smooth'
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
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('site-nav__link--active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('site-nav__link--active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Appel initial

