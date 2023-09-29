/**
 * Menu
 */
// Bg desktop menu
$(window).scroll(function() {
var scroll = $(window).scrollTop();
if (scroll >= 1100) {
   $("ul").addClass("menu_bg");
} else {
   $("ul").removeClass("menu_bg");
}
});

//Hamburger menu
$('#btn_drop_menu').on('click', function(e){
e.preventDefault();
$('.drop_menu').slideToggle('fast', function() {
   if($('.drop_menu').is(':visible')){
      $('.icon_drop_menu').removeClass('fa-bars');
      $('.icon_drop_menu').addClass('fa-xmark');
   }else{
      $('.icon_drop_menu').removeClass('fa-xmark');
      $('.icon_drop_menu').addClass('fa-bars');
   }
});
});

/**
 * Accordion
 */
let accordion = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < accordion.length; i++) {
accordion[i].addEventListener("click", function(e) {
   e.preventDefault();
   this.classList.toggle("active");
   let panel = this.nextElementSibling;
   if (panel.style.maxHeight) {
   panel.style.maxHeight = null;
   } else {
   panel.style.maxHeight = panel.scrollHeight + "px";
   }
   this.querySelector(".arrow").classList.toggle("active");
});
}

/**
 * Slider Partners
 */
$('.slider_partners').slick({
infinite: true,
// slidesToShow: 4,
slidesToScroll: 1,
centerMode: true,
variableWidth: true,
autoplay: true,
speed: 3000,
autoplaySpeed: 0,
infinite: true,
cssEase: 'linear',
mobileFirst: true,
prevArrow: '<button type="button" class="slick-custom-arrow slick-prev"><i class="fa-solid fa-circle-chevron-left"></i></button>',
nextArrow: '<button type="button" class="slick-custom-arrow slick-next"><i class="fa-solid fa-circle-chevron-right"></i></button>'
});

/**
 * Deco Animations
 */
gsap.registerPlugin(ScrollTrigger);
// Gsap syntax: 
// gsap.to(target, {duration, animation, opacity, delay...});
// gsap.from(target, {duration, animation, opacity, delay...});

// Waves All:
let wavesArray = [1, 2, 3];

function animateWaves(wavesArray, triggerClass, xValues) {
wavesArray.forEach((waveIndex, i) => {
   const waves = document.querySelectorAll(`.${triggerClass} .decorations img:nth-child(${waveIndex})`);

   gsap.to(waves, {
      x: xValues[i],
      scrollTrigger: {
         trigger: `.${triggerClass}`,
         scrub: true,
         start: "top bottom",
      },
   });
});
}

animateWaves(wavesArray, "hero", [-100, 100, -350]);
animateWaves(wavesArray, "photo_bottom", [-150, 50, -100]);
animateWaves(wavesArray, "project_gvs", [-150, 50, -100]);

// Hero
gsap.to(".star",{
rotate: -360,
scrollTrigger: { trigger: ".hero",
   // markers: true,
   scrub: true,
   start: "-=120"
}, 
});

gsap.to(".triangle",{
rotate: +360,
x: -100,
scrollTrigger: {
   trigger: ".hero",
   // markers: true,
   scrub: true,
   start: "top bottom",
   end: "+=2000"
}, 
});

// ProjectE3
gsap.to(".rectangle",{
x: -400,
scrollTrigger: {
   trigger: ".projectE3",
   // markers: true,
   scrub: true,
   start: "top bottom"
}, 
});

gsap.to(".circle",{
scale: 2,
// x: 500,
scrollTrigger: {
   trigger: ".projectE3",
   // markers: true,
   scrub: true,
   start: "top bottom"
}, 
});

// Project GVS
gsap.to(".star",{
   rotate: -360,
   x: 300,
   scrollTrigger: { trigger: ".project_gvs",
      // markers: true,
      scrub: true,
      start: "top bottom"
   }, 
   });

gsap.to(".circle_mobile",{
scale: 2,
// x: 500,
scrollTrigger: {
   trigger: ".project_gvs",
   // markers: true,
   scrub: true,
   start: "+=0"
}, 
});

//  CTA
gsap.to(".star_mobile",{
rotate: +360,
x: -250,
scrollTrigger: {
   trigger: ".cta",
   // markers: true,
   scrub: true,
   start: "top bottom",
   // start: "-=100",
   // end: "+=2000"
}, 
});

// Photo bottom
gsap.to(".triangle",{
rotate: +360,
scrollTrigger: {
   trigger: ".photo_bottom",
   // markers: true,
   scrub: true,
   start: "top bottom"
}, 
});

gsap.to(".triangle_mobile",{
rotate: +360,
scrollTrigger: {
   trigger: ".photo_bottom",
   // markers: true,
   scrub: true,
   start: "top bottom"
}, 
});



// for (let i = 0; i < wavesArray.length; i++) {
//    let waves = document.querySelectorAll(`.hero .decorations img:nth-child(${wavesArray[i]})`);
//    if (i == 0){
//       gsap.to(waves, {
//          x: -50,
//       scrollTrigger: {
//          trigger: ".about",
//          // markers: true,
//          scrub: true,
//          start: "top bottom"
//       }, });
//    } else if (i == 1){
//       gsap.to(waves, {
//          x: 50,
//       scrollTrigger: {
//          trigger: ".about",
//          // markers: true,
//          scrub: true,
//          start: "top bottom"
//       }, });
//    }else{
//       gsap.to(waves, {
//          x: -100,
//       scrollTrigger: {
//          trigger: ".about",
//          // markers: true,
//          scrub: true,
//          start: "top bottom"
//       }, });
//    }
// }

// // Waves photo-bottom
// for (let i = 0; i < wavesArray.length; i++) {
//    let waves = document.querySelectorAll(`.photo-bottom .decorations img:nth-child(${wavesArray[i]})`);
//    if (i == 0){
//       gsap.to(waves, {
//          x: -50,
//       scrollTrigger: {
//          trigger: ".photo-bottom",
//          // markers: true,
//          scrub: true,
//          start: "top bottom"
//       }, });
//    } else if (i == 1){
//       gsap.to(waves, {
//          x: 100,
//       scrollTrigger: {
//          trigger: ".photo-bottom",
//          // markers: true,
//          scrub: true,
//          start: "top bottom"
//       }, });
//    }else{
//       gsap.to(waves, {
//          x: 150,
//       scrollTrigger: {
//          trigger: ".photo-bottom",
//          // markers: true,
//          scrub: true,
//          start: "top bottom"
//       }, });
//    }
// }

// function animateWaves(wavesArray, triggerClass) {
//    wavesArray.forEach((waveIndex) => {
//      const waves = document.querySelectorAll(`.${triggerClass} .decorations img:nth-child(${waveIndex})`);

//      gsap.to(waves, {
//        x: waveIndex * -50,
//        scrollTrigger: {
//          trigger: `.${triggerClass}`,
//          scrub: true,
//          start: "top bottom",
//        },
//      });
//    });
//  }

//  animateWaves(wavesArray, "hero");
//  animateWaves(wavesArray, "photo-bottom");