export const selectCity = () => {
  const select = document.querySelector('.select');
  const selectInput = document.querySelectorAll('.select-input');
  const selectTitle = select.querySelector('.select-title');
  const selectAddress = document.querySelector('.select-details');

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

  const outsideClickHandler = event => {
    if (event.target !== selectTitle) {
      select.setAttribute('data-state', '');
    }
  };

  const selectChangeHandler = event => {
    selectTitle.textContent = uaCity[event.target.value];
    selectTitle.dataset.state = 'selected';
    selectAddress.textContent = address[event.target.value];
    select.setAttribute('data-state', '');
  };

  const selectHandler = () => {
    'active' === select.getAttribute('data-state')
      ? select.setAttribute('data-state', '')
      : select.setAttribute('data-state', 'active');
  };

  // Open and close select dropdown when click to select title
  selectTitle.addEventListener('click', selectHandler);
  // Close select when change option
  selectInput.forEach(item => {
    item.addEventListener('change', selectChangeHandler);
  });
  // Close select when click out off title
  window.addEventListener('click', outsideClickHandler);
};
