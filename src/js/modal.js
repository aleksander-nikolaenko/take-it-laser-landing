export const modal = () => {
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modalWindow = document.querySelector('[data-modal]');
  const openModalBtn = document.querySelectorAll('[data-modal-open]');
  const closeModalBtn = document.querySelector('[data-modal-close]');

  const select = document.querySelector('.modal-select');
  const selectInput = document.querySelectorAll('.modal-select-input');
  const selectTitle = select.querySelector('.modal-select-title');
  const selectAddress = document.querySelector('.modal-select-address');

  const modalForm = document.querySelector('.modal-form');

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbzgs_RFGkZVYj4uJKHD7kdSLmI-SvyU3MiF6U9S_kjUufTDsISbAqclh99qIuX4mZcO/exec';

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
    const userData = {
      name: formData.get('user-name'),
      city: formData.get('user-city'),
      nickname: formData.get('user-nikname'),
      tel: formData.get('user-tel'),
      comment: formData.get('user-text'),
    };
    modalWindow.classList.add('sending');

    // const emailLetter = `
    //   <p>Клиент ${userData.name} хочет записаться в городе ${
    //   ruCity[userData.city]
    // } </p>
    //   <p>Контакты:</p>
    //   <p>Телефон ${userData.tel}</p>
    //   ${userData.nickname ? `<p>Ник Instagram ${userData.nickname}</p>` : ''}
    //   ${userData.comment ? `<p>Комментарий: ${userData.comment}</p>` : ''}
    //   `;

    // Email.send({
    //   SecureToken: '73266ec8-5d25-41a3-aa76-87840eb28086',
    //   To: 'admin@take-it-laser.com.ua',
    //   From: 'aleksander_nikolaenko@take-it-laser.com.ua',
    //   Subject: `Письмо с сайта от ${userData.name}`,
    //   Body: emailLetter,
    // }).then((message) => {
    //   modalWindow.classList.remove('sending');
    //   alert(message);
    //   resetForm();
    //   closeModalHandler();
    // });

    fetch(scriptURL, { method: 'POST', body: formData })
      .then((response) => {
        // console.log('Success!', response);
        modalWindow.classList.remove('sending');
        resetForm();
        closeModalHandler();
      })
      .catch((error) => {
        console.error('Error!', error.message);
        modalWindow.classList.remove('sending');
        resetForm();
        closeModalHandler();
      });

    // setTimeout(() => {
    //   modalWindow.classList.remove('sending');
    //   resetForm();
    //   closeModalHandler();
    // }, 3000);
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
