<h3>Add a Pet</h3>

<form method="POST" action="?action=showpets" class="form-add-edit">

   <label for="petName">Name</label>
   <input type="text" name="petName" placeholder="Pet Name" required>

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

   <label for="breedID">Breed</label>
   <?php
      if ($breed) {
         echo "<select name='breedID' required>";
         echo "<option value=''>Select Breed</option>";
         foreach ($breed as $breed_solo) {
            echo "<option value='" . $breed_solo['breedID'] . "'>" . $breed_solo['breedName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No species found';
      }
   ?>

   <label for="genderID">Gender</label>
   <?php
      if ($gender) {
         echo "<select name='genderID' required>";
         echo "<option value=''>Select Gender</option>";
         foreach ($gender as $gender_solo) {
            echo "<option value='" . $gender_solo['genderID'] . "'>" . $gender_solo['genderName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No gender found';
      }
   ?>

   <label for="age">Age</label>
   <?php
      if ($age) {
         echo "<select name='ageID' required>";
         echo "<option value=''>Select Age</option>";
         foreach ($age as $age_solo) {
            echo "<option value='" . $age_solo['ageID'] . "'>" . $age_solo['ageName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No age found';
      }
   ?>

   <label for="colorID">Color</label>
   <?php
      if ($color) {
         echo "<select name='colorID' required>";
         echo "<option value=''>Select Color</option>";
         foreach ($color as $color_solo) {
            echo "<option value='" . $color_solo['colorID'] . "'>" . $color_solo['colorName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No color found';
      }
   ?>

   <label for="coatLengthID">Coat Length</label>
   <?php
      if ($coatLength) {
         echo "<select name='coatLengthID' required>";
         echo "<option value=''>Select Coat Length</option>";
         foreach ($coatLength as $coatLength_solo) {
            echo "<option value='" . $coatLength_solo['coatLengthID'] . "'>" . $coatLength_solo['coatLengthName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No coat length found';
      }
   ?>

   <label for="vaccinesID">Vaccines</label>
   <?php
      if ($vaccines) {
         echo "<select name='vaccinesID' required>";
         echo "<option value=''>Select Vaccines</option>";
         foreach ($vaccines as $vaccines_solo) {
            echo "<option value='" . $vaccines_solo['vaccineID'] . "'>" . $vaccines_solo['vaccineName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No vaccines found';
      }
   ?>

   <label for="neuteredID">Neutered</label>
   <?php
      if ($neutered) {
         echo "<select name='neuteredID' required>";
         echo "<option value=''>Select Neutered</option>";
         foreach ($neutered as $neutered_solo) {
			   echo "<option value='" . $neutered_solo['neuteredID'] . "'>" . $neutered_solo['neuteredName'] . "</option>";
         }	
	      echo "</select>";
      } else {
         echo 'No neutered found';
      }
   ?>

   <label for="petDescription">Description</label>
   <input type="text" name="petDescription" placeholder="Pet Description" required>

   <label for="toySpeciesID">Toy Species</label>
   <?php
      if ($toySpecies) {
         echo "<select name='toySpeciesID' required>";
         echo "<option value=''>Select Toy Species</option>";
         foreach ($toySpecies as $toySpecies_solo) {
            echo "<option value='" . $toySpecies_solo['toySpeciesID'] . "'>" . $toySpecies_solo['toySpeciesName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No toy species found';
      }
   ?>

   <label for="petFee">Fee</label>
   <input type="text" name="petFee" placeholder="Pet Fee, e.g: 10.99" required>

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=pets" class="btn"><i class="fa-solid fa-xmark"></i></a>
         
         <button type='submit' name='submitPet' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>