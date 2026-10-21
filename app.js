const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('[data-mobile-nav]');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
