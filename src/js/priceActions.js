import { generatePriceDots } from './generatePriceDots.js';

export const priceActions = () => {
  const itemDiscount = document.querySelectorAll('.price-item-discount');
  const buttonDiscount = document.querySelector('.button-link-discount');
  const buttonPrice = document.querySelector('.button-link-price');
  const listPrice = document.querySelector('.price-list');

  itemDiscount.forEach(item => {
    const price = item.querySelector('.discount-price');
    const isVisibleItems =
      price.textContent.includes('2100') ||
      price.textContent.includes('1800') ||
      price.textContent.includes('950');
    if (!isVisibleItems) {
      item.classList.add('visually-hidden');
    }
  });

  const showHideItems = () => {
    buttonDiscount.classList.add('visually-hidden');
    itemDiscount.forEach(item => {
      const price = item.querySelector('.discount-price');
      const isVisibleItems =
        price.textContent.includes('2100') ||
        price.textContent.includes('1800') ||
        price.textContent.includes('950');
      if (!isVisibleItems) {
        item.classList.remove('visually-hidden');
      }
    });
  };

  const showPrice = () => {
    buttonPrice.classList.add('visually-hidden');
    listPrice.classList.remove('visually-hidden');
    generatePriceDots();
  };

  buttonDiscount.addEventListener('click', showHideItems);
  buttonPrice.addEventListener('click', showPrice);
};
