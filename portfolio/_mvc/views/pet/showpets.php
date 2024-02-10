<h3>Pets</h3>

<article>
   <?php
      if($pets) {
         foreach($pets as $pet_solo) {
            echo "
            <section class='card'>
               <div class='wrapper'>";

                  // Check the speciesName to set the right icon
                  if ($pet_solo['speciesName'] == 'Canine') {
                     echo '<i class="icon-cat-dog fa-solid fa-shield-dog"></i>';
                  } elseif ($pet_solo['speciesName'] == 'Feline') {
                     echo '<i class="icon-cat-dog fa-solid fa-shield-cat"></i>';
                  }

                  echo"
                  <div class='name'>" . $pet_solo['petName'] . "</div>

                  <div class='id'>" . $pet_solo['petID'] . "</div>

                  <div class='species'>" . $pet_solo['speciesName'] . "</div>

                  

                  <div class='breed'>" . $pet_solo['breedName'] . "</div>

                  <div class='age'>" . $pet_solo['ageName'] . "</div>

                  <div class='gender'>" . $pet_solo['genderName'] . "</div>

                  <div class='color'>" . $pet_solo['colorName'] . "</div>

                  <div class='coat-length'>" . $pet_solo['coatLengthName'] . "</div>

                  <div class='vaccines'>" . $pet_solo['vaccineName'] . "</div>

                  <div class='neutered'>" . $pet_solo['neuteredName'] . "</div>

                  <div class='description'>" . $pet_solo['petDescription'] . "</div>

                  <div class='toy'>" . $pet_solo['toySpeciesName'] . "</div>
                  
                  <div class='fee'>" . $pet_solo['petFee'] . "</div>
               </div>

               <div class='btn-flex'>
                  <form method='POST'>
                     <input type='hidden' name='petID' value='" . $pet_solo['petID'] . "'>

                     <div class='btn-flex'>
                        <button type='submit' name='editPet' class='btn'><i class='fa-solid fa-pen-to-square'></i></button>

                        <button type='submit' name='deletePet' class='btn-delete'><i class='fa-solid fa-trash-can'></i></button>
                     </div>
                  </form>
               </div>
            </section>
            ";
         }
      } else {
         echo 'No pets found';
      }
   ?>
</article>