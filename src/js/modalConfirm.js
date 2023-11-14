export const modalConfirm = () => {
  const confirmBackdrop = document.querySelector('[data-confirm-backdrop]');
  const confirmCloseBtn = document.querySelectorAll('[data-confirm-close]');

  const openHandler = () => {
    confirmBackdrop.classList.remove('is-hidden');
    document.querySelector('html').classList.add('no-scroll');
  };
  const closeHandler = () => {
    confirmBackdrop.classList.add('is-hidden');
    document.querySelector('html').classList.remove('no-scroll');
  };

  const backdropHandler = event => {
    if (event.target === confirmBackdrop) {
      confirmBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const escKeydownHandler = event => {
    if (event.code === 'Escape') {
      confirmBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  // Close modal when click to close button
  confirmCloseBtn.forEach(item => {
    item.addEventListener('click', closeHandler);
  });
  // Close modal when click to modal backdrop or esc key
  confirmBackdrop.addEventListener('mousedown', backdropHandler);
  window.addEventListener('keydown', escKeydownHandler);
};
