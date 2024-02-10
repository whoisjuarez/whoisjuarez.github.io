<?php get_header(); ?>

   <!-- Menu -->
   <nav class="menu-flex">
      <button onclick="history.back()">
         <span class="material-symbols-outlined"">
            arrow_back
         </span>
      </button>

      <h3><?php echo get_field('single_nav_title', '176'); ?></h3>

   </nav>

   <?php 
      if(have_posts()) : 
         while(have_posts()) : the_post(); 
   ?>

   <!-- MAIN -->
   <main>

      <!-- Content -->
      <section class="content-wrapper">
         <article class="content-flex">
            <!-- Photo -->
            <div class="content-flex__left">
               <figure class="border">
                  <?php
                     $imgPost = get_field('news_photo');
                  ?>
                  <img class="border" src="<?php echo esc_url($imgPost['url']); ?>" alt="<?php echo esc_attr($imgPost['alt']); ?>">
                  
                  <figcaption><?php the_field('news_photo_caption'); ?></figcaption>
               </figure>
         </div>

            <!-- Text -->
            <div class="content-flex__right">

               <div class="category">
                  <h2><?php the_field('news_category'); ?></h2>
               </div>

               <div class="title">
                  <h1><?php the_title(); ?></h1>
               </div>

               <div class="sub-title">
                  <h2><?php the_field('news_subtitle'); ?></h2>
               </div>

               <div class="author-date">
                  <p><?php the_field('news_author_date'); ?></p>
               </div>

               <div class="text">
                  <?php the_content(); ?>
               </div>

            </div>
         </article>
      </section>
   
   </main>

   <?php
         endwhile;
      endif;
   ?>

   <?php get_footer(); ?>

</body>
</html>
