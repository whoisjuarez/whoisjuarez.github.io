<?php
   /** BREEDS **/
   class breedModel {
      private $mysqli;
      private $connectionObject;
      public function __construct ($connectionObject) {
         $this->connectionObject = $connectionObject;
      }

      public function connect() {
         try {
            $mysqli = new mysqli($this->connectionObject->host, $this->connectionObject->username, $this->connectionObject->password, $this->connectionObject->database);

            if ($mysqli->connect_error) {
               throw new Exception('Could not connect: ' . $mysqli->connect_error);
            }
            return $mysqli;
         } catch (Exception $e) {
            // Log the exception or echo a detailed error message for debugging
            error_log($e->getMessage());
            return false;
         }
      }

      // Select breeds
      public function selectBreeds() {
         $mysqli = $this->connect();

         if($mysqli) {
            $result = $mysqli->query(
              "SELECT breed.*, species.speciesName
               FROM breed
               INNER JOIN species ON breed.breedSpeciesID = species.speciesID
               ORDER BY breedID DESC;
            ");
            
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      public function selectSpecies(){
         $mysqli = $this->connect();

         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM species");
            
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Add breed
      public function addBreed($breedName, $breedSpeciesID) {
         $mysqli = $this->connect();

         if($mysqli) {
            $mysqli->query(
               "INSERT INTO breed (breedName, breedSpeciesID) 
                VALUES ('$breedName', '$breedSpeciesID')");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }

      // Delete breed
      public function deleteBreed($breedID) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query("DELETE FROM breed WHERE breedID = '$breedID'");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }

      // Select breed by ID
      public function getBreedByID($breedID) {
         $mysqli = $this->connect();
         if ($mysqli) {
            $result = $mysqli->query(
              "SELECT * FROM breed 
               WHERE breedID = '$breedID'");
            $breed = $result->fetch_assoc();
            $mysqli->close();
            return $breed;
         } else {
               return false;
         }
      }

      // Update breed
      public function updateBreed($breedID, $breedName, $breedSpeciesID) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query(
               "UPDATE breed 
                SET breedName = '$breedName', breedSpeciesID = '$breedSpeciesID'
                WHERE breedID = '$breedID'");
            $mysqli->close();
            return true;
         } else {
               return false;
         }
      }
   }
?>