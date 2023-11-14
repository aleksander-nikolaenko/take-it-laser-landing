export const sliderReviewsInit = () => {
  const swiperRewiew = new Swiper('.slider-reviews', {
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
      },
      1280: {
        slidesPerView: 4,
      },
    },
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });
};
