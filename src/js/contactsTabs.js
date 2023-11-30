export const contactsTabs = () => {
  const buttons = document.querySelectorAll('[data-contactsbutton]');
  const tabs = document.querySelectorAll('[data-contactstab]');

  const handleClickTab = event => {
    const city = {
      kh: 'kh',
      pl: 'pl',
    };

    const setStyles = city => {
      for (let i = 0; i < tabs.length; i += 1) {
        tabs[i].dataset.contactstab === city
          ? tabs[i].classList.remove('visually-hidden')
          : tabs[i].classList.add('visually-hidden');
        buttons[i].dataset.contactsbutton === city
          ? buttons[i].classList.add('current')
          : buttons[i].classList.remove('current');
      }
    };

    switch (event.target.dataset.contactsbutton) {
      case city.kh:
        setStyles(city.kh);
        break;
      case city.pl:
        setStyles(city.pl);
        break;
    }
  };

  buttons.forEach(item => {
    item.addEventListener('click', handleClickTab);
  });
};
