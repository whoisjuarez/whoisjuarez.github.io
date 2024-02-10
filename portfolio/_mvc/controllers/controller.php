<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

   include_once ("models/model_connection.php");
   include_once ("controllers/controller_breed.php");
   include_once ("controllers/controller_color.php");
   include_once ("controllers/controller_toy.php");
   include_once ("controllers/controller_pet.php");

   // Connection
   include_once ("controllers/controller_connection.php");
   $connection = new connectionObject($host, $username, $password, $database);

   // Show Menu
   class ControllerMenu {
      public function showMenu() {
         include 'views/menu.php';
      }
   }

   $controllerMenu = new ControllerMenu($connection);
   $controllerMenu->showMenu();

   // Controllers
   $controllerBreed = new ControllerBreed($connection);
   $controllerColor = new ControllerColor($connection);
   $controllerToy = new ControllerToy($connection);
   $controllerPet = new ControllerPet($connection);

   // Breeds
   if (isset($_POST['submitBreed'])) {
      $controllerBreed->addBreed();
   } else if (isset($_POST['deleteBreed'])) {
      $controllerBreed->deleteBreed();
   } else if (isset($_POST['editBreed'])) {
      $controllerBreed->showEditBreedForm();
   } else if (isset($_POST['updateBreed'])) {
      $controllerBreed->updateBreed();
   }

   // Colors
   if (isset($_POST['submitColor'])) {
      $controllerColor->addColor();
   } else if (isset($_POST['deleteColor'])) {
      $controllerColor->deleteColor();
   } else if (isset($_POST['editColor'])) {
      $controllerColor->showEditColorForm();
   } else if (isset($_POST['updateColor'])) {
      $controllerColor->updateColor();
   }

   // Toys 
   if (isset($_POST['submitToy'])) {
      $controllerToy->addToy();
   } else if (isset($_POST['deleteToy'])) {
      $controllerToy->deleteToy();
   } else if (isset($_POST['editToy'])) {
      $controllerToy->showEditToyForm();
   } else if (isset($_POST['updateToy'])) {
      $controllerToy->updateToy();
   }

   // Pets
   if (isset($_POST['submitPet'])) {
      $controllerPet->addPet();
   } else if (isset($_POST['deletePet'])) {
      $controllerPet->deletePet();
   } else if (isset($_POST['editPet'])) {
      $controllerPet->showEditPetForm();
   } else if (isset($_POST['updatePet'])) {
      $controllerPet->updatePet();
   }

   // Pages - Menu
   if(isset($_GET['page'])) {
      // Breeds
      if($_GET['page'] == 'breeds') {
         $controllerBreed->showBreeds();
      } else if($_GET['page'] == 'addbreed') {
         $controllerBreed->showAddBreedForm();
      } 

      // Colors
      if($_GET['page'] == 'colors') {
         $controllerColor->showColors();
      } else if($_GET['page'] == 'addcolor') {
         $controllerColor->showAddColorForm();
      }

      // Toys
      if($_GET['page'] == 'toys') {
         $controllerToy->showToys();
      } else if($_GET['page'] == 'addtoy') {
         $controllerToy->showAddToyForm();
      }

      // Pets
      if($_GET['page'] == 'pets') {
         $controllerPet->showPets();
      } else if($_GET['page'] == 'addpet') {
         $controllerPet->showAddPetForm();
      }
   }

   // Actions
   if(isset($_GET['action'])) {
      if($_GET['action'] == 'showbreeds') {
         $controllerBreed->showBreeds();
      } 
      else if($_GET['action'] == 'showcolors') {
         $controllerColor->showColors();
      } 
      else if($_GET['action'] == 'showtoys') {
         $controllerToy->showToys();
      } 
      else if($_GET['action'] == 'showpets') {
         $controllerPet->showPets();
      }
   }
?>