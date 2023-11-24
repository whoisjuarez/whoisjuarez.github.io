<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

    session_start();
    require_once '_includes/todo_db_connect.php';

    // simple join from 2 tables relating todo_users (foreign key) to todo_v2.userID (primary key)
    $stmt = mysqli_prepare($link, "
    SELECT *
    FROM todo_v2
    JOIN todo_users ON todo_v2.userID = todo_users.id
    WHERE todo_v2.userID = ?
    ORDER BY todo_v2.timestamp DESC
    ");

    if (!$stmt) {
        die("Statement preparation error: " . mysqli_error($link));
    }

    mysqli_stmt_bind_param($stmt, "i", $user_id);

    // var_dump($_SESSION["user_id"]);
    $user_id = $_SESSION["user_id"];

    if (mysqli_stmt_execute($stmt)){
        $result = mysqli_stmt_get_result($stmt);

        $results_array = [];
        while($row = mysqli_fetch_assoc($result)){
            $results_array[] = $row; 
        }
        // Content-Type Header: Make sure that your PHP script sets the correct Content-Type header to indicate that it's sending JSON data.
        header('Content-Type: application/json');
        echo json_encode($results_array);
    } else {
        die("Statement execution error: " . mysqli_stmt_error($stmt));
    }

    mysqli_close($link);
?>