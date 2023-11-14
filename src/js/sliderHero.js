export const sliderHeroInit = () => {
  const swiperHero = new Swiper('.slider-hero', {
    // Optional parameters
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    centeredSlides: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '</span>';
      },
    },
    // loop: true,
    // autoplay: {
    //   delay: 5000,
    // },
  });
};
