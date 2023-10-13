export const navLinkActions = () => {
  const navList = document.querySelectorAll('.nav-list');
  const anchors = document.querySelectorAll('a[href*="#"]');
  const sectionList = document.querySelectorAll('.section');
  const header = document.querySelector('.header');
  const toTopBtn = document.querySelector('#to-top');

  const headerHeight = header.clientHeight;

  const hash = window.location.hash;
  // scroll to section on load
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  }

  // scroll to section
  navList.forEach(item => {
    item.addEventListener('click', e => {
      const isNavLink = [...anchors].some(item => item === e.target);
      if (isNavLink) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href');
        const sectionToScrollTo = document.querySelector(sectionId);
        window.location.hash = `${sectionId}`;
        if (sectionToScrollTo) {
          const offsetPosition =
            sectionToScrollTo.getBoundingClientRect().top +
            window.scrollY -
            (headerHeight + 20);
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        } else {
          window.location.href = `/${sectionId}`;
        }
      }
    });
  });

  // set active nav link
  window.addEventListener('scroll', () => {
    const scrollDistance = window.scrollY;
    let currentSectionId = 'null';
    scrollDistance > headerHeight
      ? toTopBtn.classList.add('show')
      : toTopBtn.classList.remove('show');

    sectionList.forEach(item => {
      if (item.offsetTop - headerHeight - 25 <= scrollDistance) {
        currentSectionId = item.getAttribute('id');
        anchors.forEach(item => {
          if (item.classList.contains('current')) {
            item.classList.remove('current');
          }
        });
      }
      const links = document.querySelectorAll(
        `a[href*="#${currentSectionId}"]`,
      );
      if (links.length !== 0) {
        links.forEach(link => {
          link.classList.add('current');
        });
      }
    });
  });
};
