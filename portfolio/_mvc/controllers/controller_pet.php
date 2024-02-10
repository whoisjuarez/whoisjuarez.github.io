<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

   include_once ("models/model_pet.php");

   class ControllerPet {
      private $petModel;

      public function __construct($connection) {
         $this->petModel = new petModel($connection);
      }

      /** PETS **/
      // Show pets
      public function showPets() {
         $pets = $this->petModel->selectPets();
         include 'views/pet/showpets.php';
      }

      // Add pet
      public function showAddPetForm() {
         $species = $this->petModel->selectSpecies();
         $breed = $this->petModel->selectBreed();
         $gender = $this->petModel->selectGender();
         $age = $this->petModel->selectAge();
         $color = $this->petModel->selectColor();
         $coatLength = $this->petModel->selectCoatLength();
         $vaccines = $this->petModel->selectVaccines();
         $neutered = $this->petModel->selectNeutered();
         $toySpecies = $this->petModel->selectToySpecies();
         include 'views/pet/addpet_form.php';
   }

      public function addPet() {
         $petName = $_POST['petName'];
         $speciesID = $_POST['speciesID'];
         $breedID = $_POST['breedID'];
         $genderID = $_POST['genderID'];
         $ageID = $_POST['ageID'];
         $colorID = $_POST['colorID'];
         $coatLengthID = $_POST['coatLengthID'];
         $vaccinesID = $_POST['vaccinesID'];
         $neuteredID = $_POST['neuteredID'];
         $toySpeciesID = $_POST['toySpeciesID'];
         $petDescription = $_POST['petDescription'];
         $petFee = $_POST['petFee'];

         $this->petModel->addPet($petName, $speciesID, $breedID, $genderID, $ageID, $colorID, $coatLengthID, $vaccinesID, $neuteredID, $toySpeciesID, $petDescription, $petFee);

         header("Location: ?page=pets"); //to avoid resubmitting form when refreshing page
      }

      // Delete pet
      public function deletePet() {
         if(isset($_POST['deletePet'])) {
            $petID = $_POST['petID'];
            $this->petModel->deletePet($petID);
         }
     }

      // Edit/Update pet
      public function showEditPetForm() {
         $petID = $_POST['petID'];
         $pet = $this->petModel->getPetById($petID); 
         $species = $this->petModel->selectSpecies();
         $breed = $this->petModel->selectBreed();
         $gender = $this->petModel->selectGender();
         $age = $this->petModel->selectAge();
         $color = $this->petModel->selectColor();
         $coatLength = $this->petModel->selectCoatLength();
         $vaccines = $this->petModel->selectVaccines();
         $neutered = $this->petModel->selectNeutered();
         $toySpecies = $this->petModel->selectToySpecies();
         include 'views/pet/editpet_form.php';
      }

      public function updatePet() {
         if(isset($_POST['updatePet'])) {
            $petID = $_POST['petID'];
            $petName = $_POST['petName'];
            $speciesID = $_POST['speciesID'];
            $breedID = $_POST['breedID'];
            $genderID = $_POST['genderID'];
            $ageID = $_POST['ageID'];
            $colorID = $_POST['colorID'];
            $coatLengthID = $_POST['coatLengthID'];
            $vaccinesID = $_POST['vaccinesID'];
            $neuteredID = $_POST['neuteredID'];
            $toySpeciesID = $_POST['toySpeciesID'];
            $petDescription = $_POST['petDescription'];
            $petFee = $_POST['petFee'];

            $this->petModel->updatePet($petID, $petName, $speciesID, $breedID, $genderID, $ageID, $colorID, $coatLengthID, $vaccinesID, $neuteredID, $toySpeciesID, $petDescription, $petFee);
         }
     }
   }
?>