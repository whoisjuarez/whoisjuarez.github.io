<h3>Toys</h3>

<article>
   <?php
      if($toys) {
         foreach($toys as $toy_solo) {
            echo "
            <section class='card'>
               <div class='wrapper'>";

                  // Check the speciesName to set the right icon
                  if ($toy_solo['speciesName'] == 'Canine') {
                     echo '<i class="icon-cat-dog fa-solid fa-shield-dog"></i>';
                  } elseif ($toy_solo['speciesName'] == 'Feline') {
                     echo '<i class="icon-cat-dog fa-solid fa-shield-cat"></i>';
                  }

                  echo"
                  <div class='name'>" . $toy_solo['toyName'] . "</div>

                  <div class='id'>" . $toy_solo['toyID'] . "</div>

                  <div class='description'>" . $toy_solo['toyDescription'] . "</div>

                  <div class='species'>" . $toy_solo['speciesName'] . "</div>

                  <div class='quantity'>" . $toy_solo['toyQty'] . "</div>
                  
                  <div class='price'>" . $toy_solo['toyPrice'] . "</div>
               </div>

               <div class='btn-flex'>
                  <form method='POST'>
                     <input type='hidden' name='toyID' value='" . $toy_solo['toyID'] . "'>

                     <div class='btn-flex'>
                        <button type='submit' name='editToy' class='btn'><i class='fa-solid fa-pen-to-square'></i></button>

                        <button type='submit' name='deleteToy' class='btn-delete'><i class='fa-solid fa-trash-can'></i></button>
                     </div>
                  </form>
               </div>
            </section>
            ";
         }
      } else {
         echo 'No toys found';
      }
   ?>
</article>