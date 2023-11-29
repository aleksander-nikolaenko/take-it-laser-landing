export const generatePriceDots = () => {
  const itemContainer = document.querySelectorAll('.item');

  itemContainer.forEach(item => {
    const name = item.querySelector('.name');
    const price = item.querySelector('.actual-price');
    const dots = item.querySelector('.dots');
    const isSeparator = name.textContent === '';
    if (isSeparator) {
      dots.classList.add('visually-hidden');
      item.classList.add('separator');
      return;
    }
    dots.textContent = '.'.repeat(100);
    const availableSpace =
      item.offsetWidth - name.offsetWidth - price.offsetWidth - 8;

    const dotWidth = dots.offsetWidth / 100;

    const numberOfDots = Math.floor(availableSpace / dotWidth);

    numberOfDots > 0
      ? (dots.textContent = '.'.repeat(numberOfDots))
      : (dots.textContent = '.');
  });
};
