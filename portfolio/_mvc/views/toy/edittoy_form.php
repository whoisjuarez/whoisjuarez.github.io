<h3>Update Toy</h3>

<form method="POST" class="form-add-edit">
   <input type="hidden" name="toyID" value="<?php echo $toy['toyID']; ?>">

   <label for="toyName">Name</label>
   <input type="text" name="toyName" placeholder="Toy Name" value="<?php echo $toy['toyName']; ?>">

   <label for="toyDescription">Description</label>
   <input type="text" name="toyDescription" placeholder="Toy Description" value="<?php echo $toy['toyDescription']; ?>">

   <label for="speciesID">Species</label>
   <select name="speciesID">
      <option value="">Select Species</option>
      <?php
      foreach ($species as $species_solo) {
         $selected = ($species_solo['speciesID'] == $toy['toySpeciesID']) ? 'selected' : '';

         echo "<option value='" . $species_solo['speciesID'] . "' $selected>" . $species_solo['speciesName'] . "</option>";
      }
      ?>
   </select>

   <label for="toyQty">Quantity</label>
   <input type="text" name="toyQty" placeholder="Toy Quantity" value="<?php echo $toy['toyQty']; ?>">

   <label for="toyPrice">Price</label>
   <input type="text" name="toyPrice" placeholder="Toy Price" value="<?php echo $toy['toyPrice']; ?>">

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=toys" class="btn"><i class="fa-solid fa-xmark"></i></a>
         
         <button type='submit' name='updateToy' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>