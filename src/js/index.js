import { generatePriceDots } from './generatePriceDots.js';
import { isWebp } from './isWebp.js';
import { mobileMenu } from './mobileMenu.js';
import { modalConfirm } from './modalConfirm.js';
import { modalForm } from './modalForm.js';
import { navLinkActions } from './navLinkActions.js';
import { selectCity } from './selectCity.js';
import { sliderHeroInit } from './sliderHero.js';
import { sliderReviewsInit } from './sliderReviews.js';

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

window.addEventListener('load', () => {
  isWebp();
  sliderHeroInit();
  sliderReviewsInit();
  navLinkActions();
  generatePriceDots();
  mobileMenu();
  modalForm();
  modalConfirm();
  selectCity();
});

window.addEventListener(
  'resize',
  debounce(() => {
    navLinkActions();
    generatePriceDots();
  }, 300),
);
