$(window).scroll(function() {    
   var scroll = $(window).scrollTop();
   if (scroll >= 200) {
      $("ul").addClass("menu-bg");
   } else {
      $("ul").removeClass("menu-bg");
   }
});

$('.slider-partners').slick({
   infinite: true,
   slidesToShow: 4,
   slidesToScroll: 1,
   centerMode: true,
   variableWidth: true,
   autoplay: true,
   speed: 500,
   autoplaySpeed: 3000,
   infinite: true,
   cssEase: 'linear',
   // mobileFirst: true,
   prevArrow: '<button type="button" class="slick-custom-arrow slick-prev"><i class="fa-solid fa-circle-chevron-left"></i></button>',
   nextArrow: '<button type="button" class="slick-custom-arrow slick-next"><i class="fa-solid fa-circle-chevron-right"></i></button>'
});