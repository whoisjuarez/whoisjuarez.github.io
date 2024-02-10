<h3>Colors</h3>

<article>
   <?php
      if($colors) {
         foreach($colors as $color_solo) {
            echo "
            <section class='card'>
               <div class= 'wrapper'>
                  <div class='name'>
                     " . $color_solo['colorName'] . "
                  </div>
                  
                  <div class='id'>
                     " . $color_solo['colorID'] . "
                  </div>

               </div>

               <div class='btn-flex'>
                  <form method='POST'>
                     <input type='hidden' name='colorID' value='" . $color_solo['colorID'] . "'>

                     <div class='btn-flex'>
                        <button type='submit' name='editColor' class='btn'><i class='fa-solid fa-pen-to-square'></i></button>

                        <button type='submit' name='deleteColor' class='btn-delete'><i class='fa-solid fa-trash-can'></i></button>
                     </div>
                  </form>
               </div>
            </section>
            ";
         }
      } else {
         echo "No colors found";
      }
   ?>
</article>