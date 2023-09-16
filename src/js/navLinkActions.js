export const navLinkActions = () => {
  const navList = document.querySelectorAll('.nav-list');
  const anchors = document.querySelectorAll('a[href*="#"]');
  const sectionList = document.querySelectorAll('.section');
  const header = document.querySelector('.header');
  const toTopBtn = document.querySelector('#to-top');

  const headerHeight = header.clientHeight;

  // scroll to section
  navList.forEach(item => {
    item.addEventListener('click', e => {
      const isNavLink = [...anchors].some(item => item === e.target);
      if (isNavLink) {
        e.preventDefault();
        const sectionToScrollTo = document.querySelector(
          e.target.getAttribute('href'),
        );
        if (sectionToScrollTo) {
          const offsetPosition =
            sectionToScrollTo.getBoundingClientRect().top +
            window.scrollY -
            (headerHeight + 20);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // set active nav link
  window.addEventListener('scroll', () => {
    const scrollDistance = window.scrollY;
    let currentSectionId = '';
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
      document
        .querySelector(`a[href*="#${currentSectionId}"]`)
        .classList.add('current');
    });
  });
};
