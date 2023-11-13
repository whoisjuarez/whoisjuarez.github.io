<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

    session_start();
    require_once '_includes/todo_db_connect.php';

   $results = [];
   $insertedRows = 0;

   function getUserName($link, $user_id)
{
    $query = "SELECT name FROM todo_users WHERE id = ?";
   
    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $user_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $name);
        mysqli_stmt_fetch($stmt);
        mysqli_stmt_close($stmt);
        return $name;
    }
    
    return null;
}

function insertItem($link, $item, $user_id, $user_name) {
   $query = "INSERT INTO todo_v2 (item, userID, userName) VALUES (?, ?, ?)";
   
//    var_dump($_SESSION["user_id"]);
   // $user_id = $_SESSION["user_id"];
   
//    echo "insertItem function called";
   if ($stmt = mysqli_prepare($link, $query)) {
      mysqli_stmt_bind_param($stmt, "sss", $item, $user_id, $user_name); 
      mysqli_stmt_execute($stmt);
      $insertedRows = mysqli_stmt_affected_rows($stmt);

      if($insertedRows > 0) {
         $results[] = [
            "insertedRows" => $insertedRows,
            "id" => $link->insert_id,
         ];
      } else {
         throw new Exception("No rows were inserted for user ID: " . $user_id);
      }
      // Content-Type Header: Make sure that your PHP script sets the correct Content-Type header to indicate that it's sending JSON data.
      header('Content-Type: application/json');
      echo json_encode($results);
   }
}

try {
    if (!isset($_POST["item"]) || !isset($_SESSION["user_id"])) {
        throw new Exception('Required data is missing i.e. name, item, userID');
    } else {
      //   $userID = getUserID($link, $_REQUEST["email"]);
      //   insertItem($link, $_POST["item"]);

      $user_id = $_SESSION["user_id"];
        $user_name = getUserName($link, $user_id);
        
        if ($user_name) {
            insertItem($link, $_POST["item"], $user_id, $user_name);
        } else {
            throw new Exception("User name not found for user ID: " . $user_id);
        }
    }
} catch (Exception $error) {
    $results[] = ["error" => $error->getMessage()];
    header('Content-Type: application/json');
    echo json_encode($results);
}
?>


