<?php
   ini_set('display_errors', '1');
   ini_set('display_startup_errors', '1');
   error_reporting(E_ALL);

   require_once '_includes/todo_db_connect.php';
   
   $results = [];

try {
   if (!isset($_REQUEST["todoID"]) || empty($_REQUEST["todoID"])) {
      throw new Exception('The required data is missing (todoID)');
   }

   $completedId = $_REQUEST["todoID"];

   //Change status from 0 to 1
   $query = "UPDATE todo_v2 SET status = CASE WHEN status = 0 THEN 1 ELSE 0 END WHERE todoID = ?";
   
   if ($stmt = mysqli_prepare($link, $query)) {
      mysqli_stmt_bind_param($stmt, 'i', $completedId);
      mysqli_stmt_execute($stmt);
      $affectedRows = mysqli_stmt_affected_rows($stmt);
      
      if ($affectedRows > 0) {
         $results[] = [
            "message" => "Item status toggled",
            "todoID" => $completedId
         ];
      } else {
         throw new Exception("No rows updated");
      }
   } else {
      throw new Exception("Records not updated");
   }

} catch (Exception $error) {
   $results[] = ["error" => $error->getMessage()];

} finally {
   echo json_encode($results);
}
?>