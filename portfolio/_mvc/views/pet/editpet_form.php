<h3>Update Pet</h3>

<form method="POST" action="?action=showpets" class="form-add-edit">
   <input type="hidden" name="petID" value="<?php echo $pet['petID']; ?>">

   <label for="petName">Name</label>
   <input type="text" name="petName" placeholder="Pet Name" value="<?php echo $pet['petName']; ?>">

   <label for="speciesID">Species</label>
   <select name="speciesID">
      <?php
         foreach ($species as $species_solo) {
            $selected = ($species_solo['speciesID'] == $pet['petSpeciesID']) ? 'selected' : '';
         
            echo "<option value='" . $species_solo['speciesID'] . "' $selected>" . $species_solo['speciesName'] . "</option>";
         }
      ?>
   </select>

   <label for="breedID">Breed</label>
   <select name="breedID">
      <?php
         foreach ($breed as $breed_solo) {
            $selected = ($breed_solo['breedID'] == $pet['petBreedID']) ? 'selected' : '';

            echo "<option value='" . $breed_solo['breedID'] . "' $selected>" . $breed_solo['breedName'] . "</option>";
         }
      ?>
   </select>

   <label for="genderID">Gender</label>
   <select name="genderID">
      <?php
         foreach ($gender as $gender_solo) {
            $selected = ($gender_solo['genderID'] == $pet['petGenderID']) ? 'selected' : '';
            
            echo "<option value='" . $gender_solo['genderID'] . "' $selected>" . $gender_solo['genderName'] . "</option>";
         }
      ?>
   </select>

   <label for="ageID">Age</label>
   <select name="ageID">
      <?php
         foreach ($age as $age_solo) {
            $selected = ($age_solo['ageID'] == $pet['petAgeID']) ? 'selected' : '';
            
            echo "<option value='" . $age_solo['ageID'] . "' $selected>" . $age_solo['ageName'] . "</option>";
         }
      ?>
   </select>

   <label for="colorID">Color</label>
   <select name="colorID">
      <?php
         foreach ($color as $color_solo) {
            $selected = ($color_solo['colorID'] == $pet['petColorID']) ? 'selected' : '';

            echo "<option value='" . $color_solo['colorID'] . "' $selected>" . $color_solo['colorName'] . "</option>";
         }
      ?>
   </select>

   <label for="coatLengthID">Coat Length</label>
   <select name="coatLengthID">
      <?php
         foreach ($coatLength as $coatLength_solo) {
            $selected = ($coatLength_solo['coatLengthID'] == $pet['petCoatLengthID']) ? 'selected' : '';

            echo "<option value='" . $coatLength_solo['coatLengthID'] . "' $selected>" . $coatLength_solo['coatLengthName'] . "</option>";
         }
      ?>
   </select>

   <label for="vaccinesID">Vaccines</label>
   <select name="vaccinesID">
      <?php
         foreach ($vaccines as $vaccines_solo) {
            $selected = ($vaccines_solo['vaccineID'] == $pet['petVaccinesID']) ? 'selected' : '';

            echo "<option value='" . $vaccines_solo['vaccineID'] . "' $selected>" . $vaccines_solo['vaccineName'] . "</option>";
         }
      ?>
   </select>

   <label for="neuteredID">Neutered</label>
   <select name="neuteredID">
      <?php
         foreach ($neutered as $neutered_solo) {
            $selected = ($neutered_solo['neuteredID'] == $pet['petNeuteredID']) ? 'selected' : '';

            echo "<option value='" . $neutered_solo['neuteredID'] . "' $selected>" . $neutered_solo['neuteredName'] . "</option>";
         }
      ?>
   </select>

   <label for="petDescription">Description</label>
   <input type="text" name="petDescription" placeholder="Pet Description" value="<?php echo $pet['petDescription']; ?>">

   <label for="toySpeciesID">Toy Species</label>
   <select name="toySpeciesID">
      <?php
         foreach ($toySpecies as $toySpecies_solo) {
            $selected = ($toySpecies_solo['toySpeciesID'] == $pet['petToySpeciesID']) ? 'selected' : '';

            echo "<option value='" . $toySpecies_solo['toySpeciesID'] . "' $selected>" . $toySpecies_solo['toySpeciesName'] . "</option>";
         }
      ?>
   </select>

   <label for="petFee">Fee</label>
   <input type="text" name="petFee" placeholder="Pet Fee, e.g.: 10.99" value="<?php echo $pet['petFee']; ?>">

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=pets" class="btn"><i class="fa-solid fa-xmark"></i></a>
         
         <button type='submit' name='updatePet' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>
