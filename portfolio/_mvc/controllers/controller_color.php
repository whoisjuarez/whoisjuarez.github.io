<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

   include_once ("models/model_color.php");

   class ControllerColor {
      private $colorModel;

      public function __construct($connection) {
         $this->colorModel = new colorModel($connection);
      }

      /** COLORS **/
      // Show colors
      public function showColors() {
         $colors = $this->colorModel->selectColors();
         include 'views/color/showcolors.php';
     }

      // Add color
      public function showAddColorForm() {
         include 'views/color/addcolor_form.php';
     }

     public function addColor() {
         $colorName = $_POST['colorName'];
         $this->colorModel->addColor($colorName);

         header("Location: ?page=colors"); //to avoid resubmitting form when refreshing page
      }

      // Delete color
      public function deleteColor() {
         if(isset($_POST['deleteColor'])) {
            $colorID = $_POST['colorID'];
            $this->colorModel->deleteColor($colorID);
         }
     }

      // Edit/Update color
      public function showEditColorForm() {
         $colorID = $_POST['colorID'];
         $color = $this->colorModel->getColorById($colorID); 
         include 'views/color/editcolor_form.php';
      }

      public function updateColor() {
         if(isset($_POST['updateColor'])) {
            $colorID = $_POST['colorID'];
            $colorName = $_POST['colorName'];
   
            $this->colorModel->updateColor($colorID, $colorName);
         }
      }
   }
?>