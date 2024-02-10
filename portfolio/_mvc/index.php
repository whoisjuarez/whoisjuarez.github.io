<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cats & Dogs Adoption Store - MVC + MySQL</title>

      <!-- font-awesome -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">

      <!-- google fonts -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

      <link rel="stylesheet" href="assets/css/style.css">
   </head>

   <body>
      <main class="container">
         <h1><i class="fa-solid fa-shield-cat"></i> Cats & Dogs <i class="fa-solid fa-shield-dog"></i></h1>
         <h2>Adoption Store</h2>
         <!-- adding controller -->
         <?php
            include_once("controllers/controller.php");
         ?>

         <div class="credit">
            <h5>MVC + MySQL | André Cardoso</h5>
            <a href="https://github.com/whoisjuarez/block3-adv-web/tree/assignments/project-1" target="_blank">GitHub Repository</a>
         </div>
      </main>
      
   </body>

</html>