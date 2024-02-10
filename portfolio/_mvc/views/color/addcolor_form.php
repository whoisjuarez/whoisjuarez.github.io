<h3>Add a Color</h2>

<form method="POST" action="?action=showcolors" class="form-add-edit">

   <label for="colorName">Name</label>
   <input type="text" name="colorName" placeholder="Color Name" required>

   <div class='btn-flex'>
      <div class='btn-flex'>
         <a href="?page=colors" class="btn"><i class="fa-solid fa-xmark"></i></a>

         <button type='submit' name='submitColor' class='btn-confirm'><i class="fa-solid fa-check"></i></button>
      </div>
   </div>
</form>