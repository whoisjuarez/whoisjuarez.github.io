   <!-- FOOTER -->
   <footer>
         <div class="credits-flex">

            <?php if ( is_active_sidebar( 'footer' ) ) : ?>
               <?php dynamic_sidebar( 'footer' ); ?>
            <?php endif; ?>

         </div>
      </footer>

      <?php wp_footer(); ?>

   </body>
</html>