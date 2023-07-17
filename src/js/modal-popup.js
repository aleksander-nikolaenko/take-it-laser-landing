export const modalPopup = () => {
  const modalBackdropPopup = document.querySelector(
    '[data-modal-backdrop-popup]'
  );

  const closeModalBtn = document.querySelectorAll('[data-modal-popup-close]');

  const openHandler = () => {
    modalBackdropPopup.classList.remove('is-hidden');
    document.querySelector('html').classList.add('no-scroll');
  };
  const closeModalHandler = () => {
    modalBackdropPopup.classList.add('is-hidden');
    document.querySelector('html').classList.remove('no-scroll');
  };

  const backdropHandler = (event) => {
    if (event.target === modalBackdropPopup || event.code === 'Escape') {
      modalBackdropPopup.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const escKeydownHandler = (event) => {
    if (event.code === 'Escape') {
      modalBackdropPopup.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  // Close modal when click to close button
  closeModalBtn.forEach((item) => {
    item.addEventListener('click', closeModalHandler);
  });
  // Close modal when click to modal backdrop or esc key
  modalBackdropPopup.addEventListener('mousedown', backdropHandler);
  window.addEventListener('keydown', escKeydownHandler);
};
