export const modalImage = () => {
  const imageBackdrop = document.querySelector('[data-image-backdrop]');
  const modalImage = document.querySelector('[data-modal-image]');
  const imageCloseBtn = document.querySelector('[data-image-close]');
  const imageOpenModal = document.querySelectorAll('[data-image-open]');

  const openHandler = event => {
    const imageSrc = event.target.getAttribute('src');
    modalImage.setAttribute('src', imageSrc);
    imageBackdrop.classList.remove('is-hidden');
    document.querySelector('html').classList.add('no-scroll');
  };
  const closeHandler = () => {
    imageBackdrop.classList.add('is-hidden');
    document.querySelector('html').classList.remove('no-scroll');
  };

  const backdropHandler = event => {
    if (event.target === imageBackdrop) {
      imageBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const escKeydownHandler = event => {
    if (event.code === 'Escape') {
      imageBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  // Open modal when click to open image
  imageOpenModal.forEach(item => {
    item.addEventListener('click', openHandler);
  });

  // Close modal when click to close button
  imageCloseBtn.addEventListener('click', closeHandler);

  // Close modal when click to modal backdrop or esc key
  imageBackdrop.addEventListener('mousedown', backdropHandler);
  window.addEventListener('keydown', escKeydownHandler);
};
