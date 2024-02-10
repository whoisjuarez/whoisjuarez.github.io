<?php
   /** TOYS **/
   class toyModel {
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
            error_log($e->getMessage());
            return false;
         }
      }

      // Select Toy Species
      public function selectToySpecies() {
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM toy_species");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      public function selectSpecies() {
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

      // Select toys
      public function selectToys() {
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query(
              "SELECT *
               FROM toys
               NATURAL JOIN toy_species
               INNER JOIN species ON toys.toySpeciesID = species.speciesID
               ORDER BY toyID DESC;
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

      // Add toy
      public function addToy($toyName, $toyDescription, $toySpeciesID, $toyQty, $toyPrice) {
         $mysqli = $this->connect();
      
         if ($mysqli) {
            $mysqli->query(
               "INSERT INTO toys (toyName, toyDescription, toySpeciesID, toyQty, toyPrice) 
               VALUES ('$toyName', '$toyDescription', '$toySpeciesID' ,'$toyQty', '$toyPrice')");
              $mysqli->close();
              return true;
          } else {
              return false;
          }
      }

      // Delete toy
      public function deleteToy($toyID) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query("DELETE FROM toys WHERE toyID = '$toyID'");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }

      // Select toy by ID
      public function getToyById($toyID) {
         $mysqli = $this->connect();
         if ($mysqli) {
            $result = $mysqli->query(
               "SELECT * FROM toys
               WHERE toyID = '$toyID'");
            $toy = $result->fetch_assoc();
            $mysqli->close();
            return $toy;
         } else {
            return false;
         }
      }

      // Update toy
      public function updateToy($toyID, $toyName, $toyDescription, $toySpeciesID, $toyQty, $toyPrice) {
         $mysqli = $this->connect();
         if ($mysqli) {
            $mysqli->query( 
               "UPDATE toys 
               SET toyName = '$toyName', 
               toyDescription = '$toyDescription', 
               toySpeciesID = '$toySpeciesID',
               toyQty = '$toyQty',
               toyPrice = '$toyPrice'  
               WHERE toyID = '$toyID'");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }
   }
?>