<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

   include_once ("models/model_toy.php");

   class ControllerToy {
      private $toyModel;


      public function __construct($connection) {
         $this->toyModel = new toyModel($connection);
      }

      /** TOYS **/
      // Show toys
      public function showToys() {
         $toys = $this->toyModel->selectToys();
         include 'views/toy/showtoys.php';
      }

      // Add toy
      public function showAddToyForm() {
         $species = $this->toyModel->selectSpecies();
         include 'views/toy/addtoy_form.php';
      }

      public function addToy() {
         $toyName = $_POST['toyName'];
         $toyDescription = $_POST['toyDescription'];
         $speciesID = $_POST['speciesID'];
         $toyQty = $_POST['toyQty'];
         $toyPrice = $_POST['toyPrice'];

         $this->toyModel->addToy($toyName, $toyDescription, $speciesID, $toyQty, $toyPrice);

         header("Location: ?page=toys"); //to avoid resubmitting form when refreshing page
      }

      // Delete toy
      public function deleteToy() {
         if(isset($_POST['deleteToy'])) {
            $toyID = $_POST['toyID'];
            $this->toyModel->deleteToy($toyID);
         }
      }

      // Edit/Update toy
      public function showEditToyForm() {
            $toyID = $_POST['toyID'];
            $toy = $this->toyModel->getToyById($toyID); 
            $species = $this->toyModel->selectSpecies(); 
            include 'views/toy/edittoy_form.php';
      }

      public function updateToy() {
         if(isset($_POST['updateToy'])) {
            $toyID = $_POST['toyID'];
            $toyName = $_POST['toyName'];
            $toyDescription = $_POST['toyDescription'];
            $speciesID = $_POST['speciesID'];
            $toyQty = $_POST['toyQty'];
            $toyPrice = $_POST['toyPrice'];
   
            $this->toyModel->updateToy($toyID, $toyName, $toyDescription, $speciesID, $toyQty, $toyPrice);
         }
      }
   }
?>