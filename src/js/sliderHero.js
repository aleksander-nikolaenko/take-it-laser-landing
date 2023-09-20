export const sliderHeroInit = () => {
  const swiper = new Swiper('.slider-hero', {
    // Optional parameters
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '</span>';
      },
    },
    autoplay: {
      delay: 10000,
    },
  });
};
