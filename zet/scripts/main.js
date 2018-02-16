$(document).ready(function(){
  $('.slick-slider').slick({
    arrows: false,
    appendDots: $('.slider__nav'),
    dots: true,
    dotsClass: 'slider__dots',
    customPaging : function(slider, i) {
      console.log(slider);
      return '<span class="slider__dot"></span>';
    }
  });
});