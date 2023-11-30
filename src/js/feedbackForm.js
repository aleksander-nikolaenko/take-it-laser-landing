export const feedbackForm = () => {
  const confirmBackdrop = document.querySelector('[data-confirm-backdrop]');
  const formWrapper = document.querySelector('.contacts-form-wrapper');
  const form = document.querySelector('.feedback-form');

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbxp_YNGxv44lYa1nhtvUSkyfHWYwjEi7c9MBzglNLnotFU07mk59RKGILWJUIvZaDMJ/exec';

  const submitHandler = event => {
    event.preventDefault();

    const resetForm = () => {
      event.target.reset();
    };

    const formData = new FormData(event.target);
    formData.set('user-tel', formData.get('user-tel').split(' ').join(''));
    formData.set(
      'user-text',
      formData.get('user-text').concat(' -> source FeedbackForm')
    );
    formWrapper.classList.add('sending');
    // Send data to google sheet script
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        // console.log('Success!', response);
        formWrapper.classList.remove('sending');
        resetForm();
        confirmBackdrop.classList.remove('is-hidden');
        document.querySelector('html').classList.add('no-scroll');
      })
      .catch(error => {
        // console.error('Error!', error.message);
        formWrapper.classList.remove('sending');
        resetForm();
      });
  };

  form.addEventListener('submit', submitHandler);
};
