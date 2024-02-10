<h3>Add a Toy</h3>

<form method="POST" action="?action=showtoys" class="form-add-edit">

   <label for="toyName">Name</label>
   <input type="text" name="toyName" placeholder="Toy Name" required>

   <label for="toyDescription">Description</label>
   <input type="text" name="toyDescription" placeholder="Toy Description" required>
   
   <label for="speciesID">Species</label>
   <?php
      if ($species) {
         echo "<select name='speciesID' required>";
         echo "<option value=''>Select Species</option>";
         foreach($species as $specie_solo) {
               echo "<option value='" . $specie_solo['speciesID'] . "'>" . $specie_solo['speciesName'] . "</option>";
         }
         echo "</select>";
      } else {
         echo 'No species found';
      }
   ?>

   <label for="toyQty">Quantity</label>
   <input type="text" name="toyQty" placeholder="Toy Quantity"
   required>

   <label for="toyPrice">Price</label>
   <input type="text" name="toyPrice" placeholder="Toy Price, e.g.: 10.99" required>

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=toys" class="btn"><i class="fa-solid fa-xmark"></i></a>

         <button type='submit' name='submitToy' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>