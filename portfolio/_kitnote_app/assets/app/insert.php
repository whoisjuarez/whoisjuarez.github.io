<?php

session_start();
require_once "_includes/db_connect.php";

$results = [];
$insertedRows = 0;

try {
    // Check if the user is logged in and has a valid session
    if (!isset($_SESSION['userID']) || empty($_SESSION['userID'])) {
        throw new Exception('User is not logged in or has an invalid session.');
    }

    if (
        !isset($_REQUEST["note_subject"]) || trim($_REQUEST["note_subject"]) === '' ||
        !isset($_REQUEST["note_text"]) || trim($_REQUEST["note_text"]) === ''
    ) {
        throw new Exception('Required data is missing i.e. note_subject or note_text');
    }
    if (strlen(trim($_REQUEST["note_subject"])) === 0 || strlen(trim($_REQUEST["note_text"])) === 0) {
        throw new Exception('Note subject or note text cannot be just spaces.');
    }

    // Check if the color parameter is set
    $noteColor = isset($_REQUEST["note_color"]) ? $_REQUEST["note_color"] : null;

    $query = "INSERT INTO relational_note (noteSubject, noteText, userID, noteColor) VALUES (?, ?, ?, ?)";

    $userID = $_SESSION["userID"];

    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, 'ssss', $_REQUEST["note_subject"], $_REQUEST["note_text"], $userID, $noteColor);
        mysqli_stmt_execute($stmt);
        $insertedRows = mysqli_stmt_affected_rows($stmt);
        if ($insertedRows > 0) {
            $results[] = [
                "insertedRows" => $insertedRows,
                "id" => $link->insert_id,
                "note_subject" => $_REQUEST["note_subject"],
                "note_text" => $_REQUEST["note_text"],
                "userID" => $_SESSION["userID"]
            ];
        } else {
            throw new Exception("No rows were inserted");
        }
    } else {
        throw new Exception("Prepared statement did not insert records.");
    }
} catch (Exception $error) {
    //add to results array rather than echoing out errors
    $results[] = ["error" => $error->getMessage()];
} finally {
    //echo out results
    echo json_encode($results);
}
