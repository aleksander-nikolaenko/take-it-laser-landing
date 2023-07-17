export const modal = () => {
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modalBackdropPopup = document.querySelector(
    '[data-modal-backdrop-popup]'
  );
  const modalWindow = document.querySelector('[data-modal]');
  const openModalBtn = document.querySelectorAll('[data-modal-open]');
  const closeModalBtn = document.querySelector('[data-modal-close]');

  const select = document.querySelector('.modal-select');
  const selectInput = document.querySelectorAll('.modal-select-input');
  const selectTitle = select.querySelector('.modal-select-title');
  const selectAddress = document.querySelector('.modal-select-address');

  const modalForm = document.querySelector('.modal-form');

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbxp_YNGxv44lYa1nhtvUSkyfHWYwjEi7c9MBzglNLnotFU07mk59RKGILWJUIvZaDMJ/exec';

  const address = {
    default: '',
    Kharkiv: 'м.Харків, майдан Свободи 7',
    Poltava: 'м.Полтава, вул.Котляревського 3',
  };
  const ruCity = {
    default: '',
    Kharkiv: 'Харьков',
    Poltava: 'Полтава',
  };
  const uaCity = {
    default: 'Оберіть місто',
    Kharkiv: 'Харків',
    Poltava: 'Полтава',
  };

  const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse = true;
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    function createMask(event) {
      let matrix = '+38__________',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, (a) => {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let input = document.querySelector(selector);

    input.addEventListener('input', createMask);
    input.addEventListener('blur', createMask);
    input.addEventListener('focus', createMask);
  };

  const openHandler = () => {
    modalBackdrop.classList.remove('is-hidden');
    document.querySelector('html').classList.add('no-scroll');
  };
  const closeModalHandler = () => {
    modalBackdrop.classList.add('is-hidden');
    document.querySelector('html').classList.remove('no-scroll');
  };

  const backdropHandler = (event) => {
    if (event.target === modalBackdrop || event.code === 'Escape') {
      modalBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const escKeydownHandler = (event) => {
    if (event.code === 'Escape') {
      modalBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const selectHandler = () => {
    'active' === select.getAttribute('data-state')
      ? select.setAttribute('data-state', '')
      : select.setAttribute('data-state', 'active');
  };

  const selectChangeHandler = (event) => {
    selectTitle.textContent = uaCity[event.target.value];
    selectTitle.dataset.state = 'selected';
    selectAddress.textContent = address[event.target.value];
    select.setAttribute('data-state', '');
  };
  const modalClickHandler = (event) => {
    if (event.target !== selectTitle) {
      select.setAttribute('data-state', '');
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const resetForm = () => {
      event.target.reset();
      selectTitle.textContent = uaCity['default'];
      selectTitle.dataset.state = '';
      selectAddress.textContent = address['default'];
    };
    const formData = new FormData(event.target);

    modalWindow.classList.add('sending');

    // Send data to google sheet script
    fetch(scriptURL, { method: 'POST', body: formData })
      .then((response) => {
        // console.log('Success!', response);
        modalWindow.classList.remove('sending');
        resetForm();
        closeModalHandler();
        modalBackdropPopup.classList.remove('is-hidden');
        document.querySelector('html').classList.add('no-scroll');
      })
      .catch((error) => {
        // console.error('Error!', error.message);
        modalWindow.classList.remove('sending');
        resetForm();
        closeModalHandler();
      });
  };

  mask('[name="user-tel"]');

  // Open modal when click to open button
  openModalBtn.forEach((item) => {
    item.addEventListener('click', openHandler);
  });
  // Close modal when click to close button
  closeModalBtn.addEventListener('click', closeModalHandler);
  // Close modal when click to modal backdrop or esc key
  modalBackdrop.addEventListener('mousedown', backdropHandler);
  window.addEventListener('keydown', escKeydownHandler);
  // Open and close select dropdown when click to select title
  selectTitle.addEventListener('click', selectHandler);
  // Close select when change option
  selectInput.forEach((item) => {
    item.addEventListener('change', selectChangeHandler);
  });
  // Close select when click out off title
  modalWindow.addEventListener('click', modalClickHandler);
  // Submit form
  modalForm.addEventListener('submit', submitHandler);
};
