<?php

   // Add CSS
   function cv_add_css(){
      // Register
      // Home
      wp_register_style('cv-main-style', get_template_directory_uri() . '/assets/css/style_main.css');
      wp_register_style('cv-biography-style', get_template_directory_uri() . '/assets/css/style_bio.css');
      wp_register_style('cv-top10-style', get_template_directory_uri() . '/assets/css/style_top10.css');
      // Single
      wp_register_style('cv-single-style', get_template_directory_uri() . '/assets/css/style_single.css');

      // Conditionally loading on pages
      if(is_front_page()){
         // Enqueue style for home
         wp_enqueue_style('cv-main-style');
         wp_enqueue_style('cv-biography-style');
         wp_enqueue_style('cv-top10-style');
      } else {
         // Enqueue style for single
         wp_enqueue_style('cv-single-style');
      }
   }
   
   add_action('wp_enqueue_scripts', 'cv_add_css');


   // Add JS
   function cv_add_js(){
      // Enqueue jQuery
      wp_enqueue_script('jquery');

      // Register
      wp_register_script('cv-progress-js', get_template_directory_uri() . '/assets/js/script_progress.js', array(), '0.1', true);
      wp_register_script('cv-biography-js', get_template_directory_uri() . '/assets/js/script_bio.js', array('jquery'), '0.1',  true);
      wp_register_script('cv-top10-js', get_template_directory_uri() . '/assets/js/script_top10.js', array('jquery'), '0.1', true);
      // The "true" parameter means that the script will be loaded in the footer (if "false" in the header)

      // Conditionally loading on pages
      if(is_front_page()){
         // Enqueue style for home
         wp_enqueue_script('cv-progress-js');
         wp_enqueue_script('cv-biography-js');
         wp_enqueue_script('cv-top10-js');
      } else {
         // Enqueue style for single
         wp_enqueue_script('cv-progress-js');
      }
   }

   add_action('wp_enqueue_scripts', 'cv_add_js');


   // BIOGRAPHY CUSTOM POST TYPES
   function cv_bio_post_types(){
      register_post_type('bio', array(
         'supports' => array('title', 'editor'),'rewrite' => array('slug' => 'bio'),
         'public' => true,
         'has_archive' => true,
         'menu_icon' => 'dashicons-universal-access',
         'labels' => array(
            'name' => 'Biography',
            'add_new_item' => 'Add Item',
            'edit_item' => 'Edit Item',
            'all_items' => 'All Items',
            'singular_name' => 'Biography'
         )
      ));
   }

   add_action('init', 'cv_bio_post_types');


   // TOP 10 CUSTOM POST TYPES
   function cv_top10_post_types(){
      register_post_type('top10', array(
         'supports' => array('title', 'editor'),'rewrite' => array('slug' => 'top10'),
         'public' => true,
         'has_archive' => true,
         'menu_icon' => 'dashicons-editor-ol',
         'labels' => array(
            'name' => 'Top 10',
            'add_new_item' => 'Add Item',
            'edit_item' => 'Edit Item',
            'all_items' => 'All Items',
            'singular_name' => 'Top 10'
         )
      ));
   }

   add_action('init', 'cv_top10_post_types');


   // FOOTER WIDGET
   function cv_footer_widgets() {
      register_sidebar( array(
          'name'          => 'Footer',
          'id'            => 'footer',
          'description'   => 'Add widgets here to appear in your footer.',
          'before_widget' => '<div class="credits-flex">',
          'after_widget'  => '</div>',
         //  'before_title'  => '<h2 class="widget-title">',
         //  'after_title'   => '</h2>',
      ) );
  }
  add_action( 'widgets_init', 'cv_footer_widgets' );