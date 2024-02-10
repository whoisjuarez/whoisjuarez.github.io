// The issue is that the $ symbol is not recognized because WordPress runs jQuery in "no conflict" mode. This means that the $ shortcut is not available and you should use jQuery instead.
// However, you can still use $ within a self-invoking function where you pass jQuery as an argument.

const Expand = (function($) {
   let tile = $('.bio__strip');
   let tileLink = $('.bio__strip > .bio__content');
   let tileText = tileLink.find('.bio__inner-text');
   let stripClose = $('.strip__close');
   
   let expanded  = false;

   const open = function() {
       
     let tile = $(this).parent();

       if (!expanded) {
         tile.addClass('bio__strip--expanded');
         // add delay to inner text
         tileText.css('transition', 'all .5s .3s cubic-bezier(0.23, 1, 0.32, 1)');
         stripClose.addClass('strip__close--show');
         stripClose.css('transition', 'all .6s .3s cubic-bezier(0.23, 1, 0.32, 1)');
         expanded = true;
       } 
     };
   
   const close = function() {
     if (expanded) {
       tile.removeClass('bio__strip--expanded');
       // remove delay from inner text
       tileText.css('transition', 'all 0.3s 0.15s cubic-bezier(0.23, 1, 0.32, 1)');
       stripClose.removeClass('strip__close--show');
       stripClose.css('transition', 'all 0.3s 0s cubic-bezier(0.23, 1, 0.32, 1)')
       expanded = false;
     }
   }

     const bindActions = function() {
       tileLink.on('click', open);
       stripClose.on('click', close);
     };

     const init = function() {
       bindActions();
     };

     return {
       init: init
     };

   }(jQuery));

Expand.init();