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
   scrollProgress.style.background = `conic-gradient(#000 ${scrollValue}%, #fff ${scrollValue}%)`;
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