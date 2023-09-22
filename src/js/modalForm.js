export const modalForm = () => {
  const formBackdrop = document.querySelector('[data-form-backdrop]');
  const confirmBackdrop = document.querySelector('[data-confirm-backdrop]');
  const modalWindow = document.querySelector('[data-modal-form]');
  const openModalBtn = document.querySelectorAll('[data-modal-open]');
  const closeModalBtn = document.querySelector('[data-modal-close]');

  const selectTitle = document.querySelector('.select-title');
  const selectAddress = document.querySelector('.select-details');

  const modalForm = document.querySelector('.modal-form');

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbxp_YNGxv44lYa1nhtvUSkyfHWYwjEi7c9MBzglNLnotFU07mk59RKGILWJUIvZaDMJ/exec';

  const address = {
    default: '',
    Kharkiv: 'м.Харків, майдан Свободи 7',
    Poltava: 'м.Полтава, вул.Котляревського 3',
  };
  const uaCity = {
    default: 'Оберіть місто',
    Kharkiv: 'Харків',
    Poltava: 'Полтава',
  };

  const mask = selector => {
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
      let matrix = '+38 ___ ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, a => {
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
    formBackdrop.classList.remove('is-hidden');
    document.querySelector('html').classList.add('no-scroll');
  };
  const closeModalHandler = () => {
    formBackdrop.classList.add('is-hidden');
    document.querySelector('html').classList.remove('no-scroll');
  };

  const backdropHandler = event => {
    if (event.target === formBackdrop || event.code === 'Escape') {
      formBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const escKeydownHandler = event => {
    if (event.code === 'Escape') {
      formBackdrop.classList.add('is-hidden');
      document.querySelector('html').classList.remove('no-scroll');
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    const resetForm = () => {
      event.target.reset();
      selectTitle.textContent = uaCity['default'];
      selectTitle.dataset.state = '';
      selectAddress.textContent = address['default'];
    };
    const formData = new FormData(event.target);
    formData.set('user-tel', formData.get('user-tel').split(' ').join(''));
    modalWindow.classList.add('sending');

    // Send data to google sheet script
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        // console.log('Success!', response);
        modalWindow.classList.remove('sending');
        resetForm();
        closeModalHandler();
        confirmBackdrop.classList.remove('is-hidden');
        document.querySelector('html').classList.add('no-scroll');
      })
      .catch(error => {
        // console.error('Error!', error.message);
        modalWindow.classList.remove('sending');
        resetForm();
        closeModalHandler();
      });
  };

  mask('[name="user-tel"]');

  // Open modal when click to open button
  openModalBtn.forEach(item => {
    item.addEventListener('click', openHandler);
  });
  // Close modal when click to close button
  closeModalBtn.addEventListener('click', closeModalHandler);
  // Close modal when click to modal backdrop or esc key
  formBackdrop.addEventListener('mousedown', backdropHandler);
  window.addEventListener('keydown', escKeydownHandler);
  // Submit form
  modalForm.addEventListener('submit', submitHandler);
};
