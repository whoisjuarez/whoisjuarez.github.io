/**
 * DROP MENU
**/ 
let hamburger_icon = document.querySelector('span#hamburger-icon');

$('#btn_drop_menu').on('click', function(e) {
   e.preventDefault();
   $('.drop_menu').slideToggle('fast', function() {
       if ($('.drop_menu').is(':visible')) {
           $(hamburger_icon).text('close');
         //   console.log('menu open');
       } else {
           $(hamburger_icon).text('menu');
       }
   });
});

/** 
 * DARK MODE 
 **/ 
const btnToggle = document.getElementById("toggle");
const body = document.querySelector("body");
const logoBlack = document.querySelector(".logo-notes");
const logoWhite = document.querySelector(".logo-notes-white");
const catBlack = document.querySelector(".cat-deco");
const catWhite = document.querySelector(".cat-deco-white");

btnToggle.addEventListener('change', (e)=>{
   console.log(e.target.checked);
   if(e.target.checked){
      window.localStorage.setItem('mode', 'dark-mode');
   } else {
      window.localStorage.setItem('mode', 'light-mode');
   }
   checkMode();
})

const checkMode = () => {
   if(window.localStorage.getItem('mode') == 'dark-mode'){
      btnToggle.checked = true;
      console.log("Dark-Mode");
      // Add
      body.classList.add("dark-mode");
      logoWhite.classList.add("logo-notes-show");
      catWhite.classList.add("cat-deco-show");
      // Remove
      body.classList.remove("light-mode");
      logoBlack.classList.remove("logo-notes-show");
      catBlack.classList.remove("cat-deco-show");

   } else {
      btnToggle.checked = false;
      console.log("Light-Mode");
      // Add
      body.classList.add("light-mode");
      logoBlack.classList.add("logo-notes-show");
      catBlack.classList.add("cat-deco-show");
      // Remove
      body.classList.remove("dark-mode");
      logoWhite.classList.remove("logo-notes-show");
      catWhite.classList.remove("cat-deco-show");
   }
}
checkMode();