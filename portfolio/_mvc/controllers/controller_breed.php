<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

   include_once ("models/model_breed.php");

   class ControllerBreed {
      private $breedModel;

      public function __construct($connection) {
         $this->breedModel = new breedModel($connection);
      }

      /** BREEDS **/
      // Show breeds
      public function showBreeds() {
         $breeds = $this->breedModel->selectBreeds();
         include 'views/breed/showbreeds.php';
      }

      // Add breed
      public function showAddBreedForm() {
         $species = $this->breedModel->selectSpecies();
         include 'views/breed/addbreed_form.php';
      }

      public function addBreed() {
         $breedName = $_POST['breedName'];
         $speciesID = $_POST['speciesID'];

         $this->breedModel->addBreed($breedName, $speciesID);

         header("Location: ?page=breeds"); //to avoid resubmitting form when refreshing page
      }

      // Delete breed
      public function deleteBreed() {
         if(isset($_POST['deleteBreed'])) {
            $breedID = $_POST['breedID'];
            $this->breedModel->deleteBreed($breedID);
         }
      }

      // Edit/Update breed
      public function showEditBreedForm() {
         $breedID = $_POST['breedID'];
         // Add a method to fetch a breed by ID
         $breed = $this->breedModel->getBreedById($breedID); 
         // Show species in dropdown menu
         $species = $this->breedModel->selectSpecies();
         include 'views/breed/editbreed_form.php';
      }

      public function updateBreed() {
         if(isset($_POST['updateBreed'])) {
            $breedID = $_POST['breedID'];
            $breedName = $_POST['breedName'];
            $speciesID = $_POST['speciesID'];

            $this->breedModel->updateBreed($breedID, $breedName, $speciesID);
         }
      }
   }
?>