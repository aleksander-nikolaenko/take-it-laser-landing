import { contactsTabs } from './contactsTabs.js';
import { createPhoneNumberMask } from './createMasks.js';
import { feedbackForm } from './feedbackForm.js';
import { generatePriceDots } from './generatePriceDots.js';
import { isWebp } from './isWebp.js';
import { mobileMenu } from './mobileMenu.js';
import { modalConfirm } from './modalConfirm.js';
import { modalForm } from './modalForm.js';
import { modalImage } from './modalImage.js';
import { navLinkActions } from './navLinkActions.js';
import { priceActions } from './priceActions.js';
import { selectCity } from './selectCity.js';
import { sliderHeroInit } from './sliderHero.js';
import { sliderResultsInit } from './sliderResults.js';
import { sliderReviewsInit } from './sliderReviews.js';
import { toggleAnswerQuestions } from './toggleAnswerQuestions.js';

window.addEventListener('load', () => {
  isWebp();
  sliderHeroInit();
  sliderReviewsInit();
  sliderResultsInit();
  navLinkActions();
  priceActions();
  mobileMenu();
  modalForm();
  feedbackForm();
  modalConfirm();
  modalImage();
  selectCity();
  toggleAnswerQuestions();
  createPhoneNumberMask();
  contactsTabs();
});

window.addEventListener(
  'resize',
  debounce(() => {
    generatePriceDots();
  }, 300)
);

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
