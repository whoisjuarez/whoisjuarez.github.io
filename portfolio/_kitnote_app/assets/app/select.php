<?php

    session_start();
    require_once "_includes/db_connect.php";

    $stmt = mysqli_prepare($link, "SELECT * FROM relational_note WHERE relational_note.userID = ? ORDER BY timestamp DESC");

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $_SESSION['userID']);

        mysqli_stmt_execute($stmt);
    
        $result = mysqli_stmt_get_result($stmt);

        $results = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $results[] = $row;
        }

        echo json_encode($results);
        
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['error' => mysqli_error($link)]);
    }

    mysqli_close($link);
?>