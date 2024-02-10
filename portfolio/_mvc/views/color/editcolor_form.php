<h3>Update Color</h3>

<form method="POST" class="form-add-edit">
   <input type="hidden" name="colorID" value="<?php echo $color['colorID']; ?>">

   <label for="colorName">Name</label>
   <input type="text" name="colorName" placeholder="Color Name" value="<?php echo $color['colorName']; ?>">

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=colors" class="btn"><i class="fa-solid fa-xmark"></i></a>
         
         <button type='submit' name='updateColor' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>
