// The $ symbol is not recognized because WordPress runs jQuery in "no conflict" mode. This means that the $ shortcut is not available and you should use jQuery instead.
// However, you can still use $ within a self-invoking function where you pass jQuery as an argument.

jQuery(document).ready(function ($) {
   let clickedTab = $(".tabs > .active");
   let tabWrapper = $(".tab__content");
   let activeTab = tabWrapper.find(".active");
   let activeTabHeight = activeTab.outerHeight();

   // Show tab on page load
   activeTab.show();

   // Set height of active tab
   tabWrapper.height(activeTabHeight);

   $(".tabs > li").on("click", function () {
      $(".tabs > li").removeClass("active");

      $(this).addClass("active");

      // Update variable
      clickedTab = $(".tabs .active");

      activeTab.fadeOut(150, function () {
         $(".tab__content > li").removeClass("active");

         // Get index of clicked tab
         let clickedTabIndex = clickedTab.index();

         // Add class active to corresponding tab
         $(".tab__content > li").eq(clickedTabIndex).addClass("active");

         // update new active tab
         activeTab = $(".tab__content > .active");

         // Update variable
         activeTabHeight = activeTab.outerHeight();

         // Animate height of wrapper to new tab height
         tabWrapper
         .stop()
         .delay()
         .animate(
            {
               height: activeTabHeight,
            },
            150,
            function () {
               // Fade in active tab
               activeTab.delay().fadeIn(250);
            }
         );
      });
   });
}(jQuery));