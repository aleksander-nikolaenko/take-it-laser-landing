export const mobileMenu = () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const openMenuBtn = document.querySelector('.menu-btn-open');
  const closeMenuBtn = document.querySelector('.menu-btn-close');
  const mobNavLinks = document.querySelectorAll('.mobile-menu-nav-link');

  const openMenuHandler = () => {
    openMenuBtn.setAttribute('aria-expanded', true);
    mobileMenu.classList.add('is-open');
    openMenuBtn.classList.add('visually-hidden');
    closeMenuBtn.classList.remove('visually-hidden');

    document.querySelector('html').classList.add('no-scroll');
  };
  const closeMenuHandler = () => {
    openMenuBtn.setAttribute('aria-expanded', false);
    mobileMenu.classList.remove('is-open');
    openMenuBtn.classList.remove('visually-hidden');
    closeMenuBtn.classList.add('visually-hidden');

    document.querySelector('html').classList.remove('no-scroll');
  };

  openMenuBtn.addEventListener('click', openMenuHandler);
  closeMenuBtn.addEventListener('click', closeMenuHandler);
  mobNavLinks.forEach((item) => {
    item.addEventListener('click', closeMenuHandler);
  });

  // Закрываем мобильное меню на более широких экранах
  // в случае изменения ориентации устройства.
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    openMenuBtn.classList.remove('visually-hidden');
    closeMenuBtn.classList.add('visually-hidden');
    document.querySelector('html').classList.remove('no-scroll');
  });
};
