<h3>Update Breed</h3>

<form method="POST" class="form-add-edit">
   <input type="hidden" name="breedID" value="<?php echo $breed['breedID']; ?>">

   <label for="breedName">Name</label>
   <input type="text" name="breedName" placeholder="Breed Name" value="<?php echo $breed['breedName']; ?>">

   <label for="speciesID">Species</label>
   <select name="speciesID">
      <option value="">Select Species</option>
      <?php
      foreach ($species as $species_solo) {
         $selected = ($species_solo['speciesID'] == $breed['breedSpeciesID']) ? 'selected' : '';
         
         echo "<option value='" . $species_solo['speciesID'] . "' $selected>" . $species_solo['speciesName'] . "</option>";
      }
      ?>
   </select>

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=breeds" class="btn"><i class="fa-solid fa-xmark"></i></a>
         
         <button type='submit' name='updateBreed' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>
