<?php
   /** COLORS **/
   class colorModel {
      private $mysqli;
      private $connectionObject;
      public function __construct($connectionObject) {
         $this->connectionObject = $connectionObject;
      }
      public function connect() {
         try {
            $mysqli = new mysqli(
                  $this->connectionObject->host, 
                  $this->connectionObject->username,
                  $this->connectionObject->password, 
                  $this->connectionObject->database
               );
   
            if($mysqli->connect_error) {
               throw new Exception('Could not connect');
            }
            return $mysqli;
         } catch(Exception $e) {
            error_log($e->getMessage());
            return false;
         }
      }

      // Select colors
      public function selectColors(){
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query(
               "SELECT * FROM color
               ORDER BY colorID DESC;");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Add color
      public function addColor($colorName) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query("INSERT INTO color (colorName) VALUES ('$colorName')");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }

      // Delete color
      public function deleteColor($colorID) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query("DELETE FROM color WHERE colorID = '$colorID'");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }

      // Select color by ID
      public function getColorById($colorID) {
         $mysqli = $this->connect();
         if ($mysqli) {
            $result = $mysqli->query(
               "SELECT * FROM color 
               WHERE colorID = '$colorID'");
            $color = $result->fetch_assoc();
            $mysqli->close();
            return $color;
         } else {
            return false;
         }
     }

      // Update color
      public function updateColor($colorID, $colorName) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query(
               "UPDATE color 
               SET colorName = '$colorName' 
               WHERE colorID = '$colorID'");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }
   }
?>