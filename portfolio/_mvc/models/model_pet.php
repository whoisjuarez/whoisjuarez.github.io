<?php
   /** PET **/
   class petModel {
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

      // Select Species
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

      // Select Breed
      public function selectBreed(){
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM breed");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Select Gender
      public function selectGender() {
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM gender");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Select Age
      public function selectAge(){
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM age");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Select Color
      public function selectColor(){
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM color");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Select Coat-length
      public function selectCoatLength(){
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM `coat-length`");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Select Vaccines
      public function selectVaccines() {
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM vaccines");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
            return false;
         }
      }

      // Select Neutered
      public function selectNeutered() {
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query("SELECT * FROM neutered");
            while($row = $result->fetch_assoc()) {
               $results[] = $row;
            }
            $mysqli->close();
            return $results;
         } else {
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

      // Select Pets
      public function selectPets(){
         $mysqli = $this->connect();
         if($mysqli) {
            $result = $mysqli->query(
               "SELECT pet.*, 
               species.speciesName, 
               breed.breedName,
               gender.genderName, 
               age.ageName, 
               color.colorName, 
               `coat-length`.coatLengthName, 
               vaccines.vaccineName,
               neutered.neuteredName, 
               toy_species.toySpeciesName
               FROM pet
               INNER JOIN species ON pet.petSpeciesID = species.speciesID
               INNER JOIN breed ON pet.petBreedID = breed.breedID
               INNER JOIN gender ON pet.petGenderID = gender.genderID
               INNER JOIN age ON pet.petAgeID = age.ageID
               INNER JOIN color ON pet.petColorID = color.colorID
               INNER JOIN `coat-length` ON pet.petCoatLengthID = `coat-length`.coatLengthID
               INNER JOIN vaccines ON pet.petVaccinesID = vaccines.vaccineID
               INNER JOIN neutered ON pet.petNeuteredID = neutered.neuteredID
               INNER JOIN toy_species ON pet.petToySpeciesID = toy_species.toySpeciesID
               ORDER BY petID DESC;
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

      // Add Pet
      public function addPet($petName, $petSpeciesID, $petBreedID, $petGenderID, $petAgeID, $petColorID, $petCoatLengthID, $petVaccinesID, $petNeuteredID, $petToySpeciesID, $petDescription, $petFee) {
          $mysqli = $this->connect();
          if($mysqli) {
              $mysqli->query(
               "INSERT INTO pet (petName, petSpeciesID, petBreedID, petGenderID, petAgeID, petColorID, petCoatLengthID, petVaccinesID, petNeuteredID, petToySpeciesID, petDescription, petFee) VALUES ('$petName', '$petSpeciesID', '$petBreedID', '$petGenderID', '$petAgeID', '$petColorID', '$petCoatLengthID', '$petVaccinesID', '$petNeuteredID', '$petToySpeciesID', '$petDescription', '$petFee')");
              $mysqli->close();
              return true;
          } else {
              return false;
          }
      }

      // Delete Pet
      public function deletePet($petID) {
         $mysqli = $this->connect();
         if($mysqli) {
            $mysqli->query("DELETE FROM pet WHERE petID = '$petID'");
            $mysqli->close();
            return true;
         } else {
            return false;
         }
      }

      // Select Pet by ID
      public function getPetById($petID) {
          $mysqli = $this->connect();
          if ($mysqli) {
              $result = $mysqli->query("SELECT * FROM pet WHERE petID = '$petID'");
              $pet = $result->fetch_assoc();
              $mysqli->close();
              return $pet;
          } else {
              return false;
          }
      }

      // Update Pet
      public function updatePet($petID, $petName, $petSpeciesID, $petBreedID, $petGenderID, $petAgeID, $petColorID, $petCoatLengthID, $petVaccinesID, $petNeuteredID, $petToySpeciesID, $petDescription, $petFee) {
          $mysqli = $this->connect();
          if($mysqli) {
              $mysqli->query(
               "UPDATE pet 
               SET petName = '$petName',
               petSpeciesID = '$petSpeciesID',
               petBreedID = '$petBreedID',
               petGenderID = '$petGenderID',
               petAgeID = '$petAgeID',
               petColorID = '$petColorID',
               petCoatLengthID = '$petCoatLengthID',
               petVaccinesID = '$petVaccinesID',
               petNeuteredID = '$petNeuteredID',
               petToySpeciesID = '$petToySpeciesID',
               petDescription = '$petDescription',
               petFee = '$petFee'
               WHERE petID = '$petID'");
              $mysqli->close();
              return true;
          } else {
              return false;
          }
      }
  }
?>