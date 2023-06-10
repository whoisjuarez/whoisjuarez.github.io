$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  if (scroll >= 400) {
    $("progress-filled").addClass("gotop-visible");
  } else {
    $("progress-filled").removeClass("progress-bar-visible");
  }
});

// PROGRESS BAR - SCROLL TO TOP
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress-bar");
  let progressValue = document.getElementById("progress-filled");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 200) {
    scrollProgress.style.opacity = "1";
  } else {
    scrollProgress.style.opacity = "0";
  }
  scrollProgress.style.background = `conic-gradient(#000 ${scrollValue}%, transparent ${scrollValue}%)`;
};

window.addEventListener("scroll", () => {
  let scrollProgress = document.getElementById("progress-bar");
  let pos = document.documentElement.scrollTop;
  if (pos > 200) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
  });
});
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// ANIMATIONS
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 150, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out', // default easing for AOS animations
  once: 1, // whether animation should happen only once - while scrolling down
  mirror: 0, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top', // defines which position of the element regarding to window should trigger the animation
});

/* Modal */
// document.getElementById('cn2').addEventListener('click', function(){
//   document.querySelector('.modal').style.display = 'flex';})

// function addModalEventListener(id) {
//   const element = document.getElementById(id);
//   if (element) {
//     element.addEventListener('click', function() {
//       document.querySelector('.modal').style.display = 'flex';
//     });
//   }
// }

// document.querySelector('.close').addEventListener('click', function() {
//  document.querySelector('.modal').style.display = 'none';})



// function addModalEventListener(id) {
//   const element = document.getElementById(id);
//   if (element) {
//     element.addEventListener('click', function() {
//       const modalId = element.getAttribute('data-modal-id');
//       const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);
//       if (modal) {
//         modal.style.display = 'flex';
//       }
//     });
//   }
// }

function addModalEventListener(id) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener('click', function() {
      const modalId = element.getAttribute('data-modal-id');
      const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);
      if (modal) {
        modal.style.display = 'flex';
        document.addEventListener('click', function(event) {

          // Close it on click
          if (modal.contains(event.target)) {
            modal.style.display = 'none';
          }
        });
      }
    });
  }
}

addModalEventListener('urbinz');
addModalEventListener('cn2');
addModalEventListener('anim');
addModalEventListener('pack');
addModalEventListener('cn');
addModalEventListener('edenred');