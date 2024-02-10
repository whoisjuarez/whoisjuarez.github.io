<?php get_header(); ?>

<!-- MAIN -->
<main>

   <!-- HERO -->
   <section class="hero">
      <div class="hero-flex">
         <article class="hero-flex__left">
            <h1 class="hero-title"><?php the_field('hero_title'); ?></h1>

            <div class="text-box border">
               <h2><?php the_field('hero_subtitle'); ?></h2>

               <!-- Text -->
               <?php the_field('hero_text'); ?>

               <a href="#bio" class="btn">Begin the journey <span class="material-symbols-outlined">arrow_downward</span></a>
            </div>
         </article>
         
         <figure class="hero-flex__right">
            <div class="border">
               <div class="photo-hero border">
                  <figure class="photo-hero__bg" style="background-image: url(<?php the_field('hero_photo'); ?>);"></figure>
               </div>
            </div>
         </figure>
      </div>
   </section>


   <!-- BIOGRAPHY -->
   <section class="bio" id="bio">

      <?php
            $homepageBio = new WP_Query(array(
               'posts_per_page' => 6,
               'post_type' => 'bio'
            ));

            while($homepageBio->have_posts()) {
               $homepageBio->the_post();
         ?>

         <article class="bio__strip">
            <div class="bio__content" style="background-image: url(<?php the_field('bio_photo'); ?>);">
               <h1 class="bio__title" ><?php the_field('bio_name'); ?></h1>

               <div class="bio__inner-text">
                  <h1><?php the_title(); ?></h1>

                  <h2><?php the_field('bio_subtitle'); ?></h2>
               
                  <div class="bio-content-text">
                     <?php the_content(); ?>
                  </div>
               </div>
            </div>
         </article>

         <?php
            } 
            wp_reset_postdata();
         ?>

      <!-- Close Btn -->
      <span class="material-symbols-outlined strip__close">close</span>
   </section>


   <!-- NEWS/POSTS SECTION -->
   <section class="news">
      <article class="news-flex">

         <?php
            $homepageNews = new WP_Query(array(
               'posts_per_page' => 2,
               'post_type' => 'post'
            ));

            while($homepageNews->have_posts()) {
               $homepageNews->the_post();
         ?>

         <div class="news-flex__card">
            <div class="text">
               <h2><?php the_field('news_category'); ?></h2>

               <h1><?php the_title(); ?></h1>

               <h2><?php the_field('news_subtitle'); ?></h2>
            </div>
            
            <div class="link">
               <a href="<?php the_permalink(); ?>" class="btn"><?php the_field('news_button_text'); ?></a>
            </div>
         </div>

         <?php
            }
            wp_reset_postdata();
         ?>

      </article>
   </section>


   <!-- TOP 10 -->
   <section class="top10__wrapper">
      <h1><?php the_field('top_10_section_title'); ?></h1>

      <article>
         <!-- Tabs -->
         <ul class="tabs">
            <?php
               $homepageTop10 = new WP_Query(array(
                  'posts_per_page' => 10,
                  'post_type' => 'top10'
               ));

               $counter = 0;

               while($homepageTop10->have_posts()) {
                  $homepageTop10->the_post();
            ?>

            <li class="<?php if($counter == 0) echo 'active'; ?>">
               <h2> <?php the_field('rank_number'); ?> </h2>
            </li>

            <?php
               $counter++;
               } 
               wp_reset_postdata();
            ?>
         </ul>

         <!-- Content -->
         <ul class="tab__content">
            <?php
               $homepageTop10 = new WP_Query(array(
                  'posts_per_page' => 10,
                  'post_type' => 'top10'
               ));

               $counter = 0;

               while($homepageTop10->have_posts()) {
                  $homepageTop10->the_post();
            ?>
            
            <li class="<?php if($counter == 0) echo 'active'; ?>">
               <div class="content__wrapper">
                  <article class="top10-flex">
                     <div class="top10-flex__left">
                        <figure class="border">
                           <?php
                              $itemImg = get_field('item_image');
                           ?>
                           <img class="border" src="<?php echo esc_url($itemImg['url']); ?>" alt="<?php echo esc_attr($itemImg['alt']); ?>" loading="lazy">
                        </figure>
                     </div>

                     <div class="top10-flex__right">
                        <h2><?php the_title(); ?></h2>
                        
                        <div class="top10_content">
                           <?php the_content(); ?>
                        </div>
                     </div>
                  </article>
               </div>
            </li>

            <?php
               $counter++;
               } 
               wp_reset_postdata();
            ?>         
         </ul>
      </article>
   </section>

</main>

<?php get_footer(); ?>