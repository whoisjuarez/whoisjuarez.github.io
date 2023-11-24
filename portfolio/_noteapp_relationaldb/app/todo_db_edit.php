<?php
   ini_set('display_errors', '1');
   ini_set('display_startup_errors', '1');
   error_reporting(E_ALL);

   require_once '_includes/todo_db_connect.php';
   // require_once '_includes/todo_db_select.php';

   $toEditId = $_REQUEST['todoID'];
   $item = $_REQUEST['item'];

   // Use prepared statements to prevent SQL injection
   $query = "UPDATE todo_v2 SET item = ? WHERE todoID = ?";
   $stmt = mysqli_prepare($link, $query);
   
   if (!$stmt) {
      // Handle SQL statement preparation error
      echo json_encode(["error" => "SQL statement preparation failed"]);
      exit;
   }
   
   mysqli_stmt_bind_param($stmt, 'si', $item, $toEditId);
   
   if (!mysqli_stmt_execute($stmt)) {
      // Handle SQL execution error
      echo json_encode(["error" => "SQL statement execution failed"]);
      exit;
   }
   
   // Successful update
   echo json_encode(["message" => "Item updated successfully"]);

   mysqli_close($link);
?>