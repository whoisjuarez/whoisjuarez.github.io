<?php
   ini_set('display_errors', '1');
   ini_set('display_startup_errors', '1');
   error_reporting(E_ALL);

   require_once '_includes/todo_db_connect.php';

   $toDelete = $_REQUEST['todoID'];

   if(!isset($toDelete)) {
      // Handle missing or invalid data (e.g., return an error response)
      echo json_encode(["error" => "Invalid data received"]);
      exit;
   }
  
   // Use prepared statements to prevent SQL injection
   $query = "DELETE FROM todo_v2 WHERE todoID = ?";
   $stmt = mysqli_prepare($link, $query);
  
   if (!$stmt) {
      // Handle SQL statement preparation error
      echo json_encode(["error" => "SQL statement preparation failed"]);
      exit;
   }
  
   mysqli_stmt_bind_param($stmt, 'i', $toDelete);

   if (!mysqli_stmt_execute($stmt)) {
      // Handle SQL execution error
      echo json_encode(["error" => "SQL statement execution failed"]);
      exit;
   }
  
   // Successful deletion
   echo json_encode(["message" => "Item deleted successfully"]);

   mysqli_close($link);
?>