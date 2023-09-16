import { generatePriceDots } from './generatePriceDots.js';
import { isWebp } from './isWebp.js';
import { mobileMenu } from './mobileMenu.js';
import { modalConfirm } from './modalConfirm.js';
import { modalForm } from './modalForm.js';
import { navLinkActions } from './navLinkActions.js';
import { selectCity } from './selectCity.js';

function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

const swiper = new Swiper('.slider', {
  // Optional parameters
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>';
    },
  },
  autoplay: {
    delay: 10000,
  },
});

window.addEventListener('load', () => {
  isWebp();
  mobileMenu();
  modalForm();
  modalConfirm();
  selectCity();
  navLinkActions();
  generatePriceDots();
});

window.addEventListener(
  'resize',
  debounce(() => {
    navLinkActions();
    generatePriceDots();
  }, 300),
);
