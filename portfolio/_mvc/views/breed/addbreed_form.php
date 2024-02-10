<h3>Add a Breed</h3>

<form method="POST" action="?action=showbreeds" class="form-add-edit">

   <label for="breedName">Name</label>
   <input type="text" name="breedName" placeholder="Breed Name" required>

   <label for="speciesID">Species</label>
   <?php
      if ($species) {
         echo "<select name='speciesID' required>";
         echo "<option value=''>Select Species</option>";
         foreach ($species as $species_solo) {
               echo "<option value='" . $species_solo['speciesID'] . "'>" . $species_solo['speciesName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No species found';
      }
?>

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=breeds" class="btn"><i class="fa-solid fa-xmark"></i></a>

         <button type='submit' name='submitBreed' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>

</form>