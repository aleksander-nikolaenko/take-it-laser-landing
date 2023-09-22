import Swiper from 'swiper';

export const sliderReviewsInit = () => {
  const swiper = new Swiper('.slider-reviews', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '</span>';
      },
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 4,
        centeredSlides: false,
      },
    },
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    // If we need pagination

    autoplay: {
      delay: 5000,
    },
  });
};
