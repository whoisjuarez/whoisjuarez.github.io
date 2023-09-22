// Bg menu
$(window).scroll(function() {
   var scroll = $(window).scrollTop();
   if (scroll >= 1100) {
      $("ul").addClass("menu_bg");
   } else {
      $("ul").removeClass("menu_bg");
   }
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
   slidesToShow: 4,
   slidesToScroll: 1,
   centerMode: true,
   variableWidth: true,
   autoplay: true,
   speed: 3000,
   autoplaySpeed: 0,
   infinite: true,
   cssEase: 'linear',
   // mobileFirst: true,
   prevArrow: '<button type="button" class="slick-custom-arrow slick-prev"><i class="fa-solid fa-circle-chevron-left"></i></button>',
   nextArrow: '<button type="button" class="slick-custom-arrow slick-next"><i class="fa-solid fa-circle-chevron-right"></i></button>'
});

/**
 * Animations
 */
gsap.registerPlugin(ScrollTrigger);
// Gsap syntax: 
// gsap.to(target, {duration, animation, opacity, delay...});
// gsap.from(target, {duration, animation, opacity, delay...});


// Star hero
gsap.to(".star",{
   rotate: -360,
   scrollTrigger: { trigger: ".hero",
      // markers: true,
      scrub: true,
      start: "-=120"
   }, 
 });

// Triangle hero
 gsap.to(".triangle",{
   rotate: +360,
   scrollTrigger: {
      trigger: ".about",
      // markers: true,
      scrub: true,
      start: "top bottom"
   }, 
 });

//  Rectangle projectE3
gsap.to(".rectangle",{
   x: -400,
   scrollTrigger: {
      trigger: ".projectE3",
      // markers: true,
      scrub: true,
      start: "top bottom"
   }, 
 });

 // Circle projectE3
 gsap.to(".circle",{
   scale: 2,
   scrollTrigger: {
      trigger: ".projectE3",
      // markers: true,
      scrub: true,
      start: "top bottom"
   }, 
 });

 // Star gvs
gsap.to(".star",{
   rotate: -360,
   x: 300,
   scrollTrigger: {
      trigger: ".projectE3",
      // markers: true,
      scrub: true,
      start: "bottom bottom",
      // start: "-=100",
      end: "+=2000"
   }, 
 });

 // Triangle photo-bottom
 gsap.to(".triangle",{
   rotate: +360,
   scrollTrigger: {
      trigger: ".photo_bottom",
      // markers: true,
      scrub: true,
      start: "top bottom"
   }, 
 });

// Waves:
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