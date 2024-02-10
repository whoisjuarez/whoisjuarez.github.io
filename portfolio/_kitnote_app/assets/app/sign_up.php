<?php

    session_start();
    require_once "_includes/db_connect.php";

    $results = [];
    $insertedRows = 0;

    try {
        if (
            !isset($_REQUEST["signup-username"]) || trim($_REQUEST["signup-username"]) === '' ||
            !isset($_REQUEST["signup-password"]) || trim($_REQUEST["signup-password"]) === ''
        ) {
            throw new Exception('Required data is missing, i.e., username or password');
        }

        // Additional check to ensure username and password are not just spaces
        if (
            strlen(trim($_REQUEST["signup-username"])) === 0 || strlen(trim($_REQUEST["signup-password"])) === 0
        ) {
            throw new Exception('Username or password cannot be just spaces.');
        }

        // Check if the username already exists
        $checkQuery = "SELECT COUNT(*) FROM relational_users WHERE user_name = ?";
        if ($checkStmt = mysqli_prepare($link, $checkQuery)) {
            mysqli_stmt_bind_param($checkStmt, 's', $_REQUEST["signup-username"]);
            mysqli_stmt_execute($checkStmt);
            mysqli_stmt_bind_result($checkStmt, $userCount);
            mysqli_stmt_fetch($checkStmt);
            mysqli_stmt_close($checkStmt);

            if ($userCount > 0) {
                throw new Exception("Username already exists");
            }
        } else {
            throw new Exception("Prepared statement did not check for username existence.");
        }

        // Hash the password for security
        $hashedPassword = password_hash($_REQUEST["signup-password"], PASSWORD_DEFAULT);

        // SQL query to insert a new user into the database
        $insertQuery = "INSERT INTO relational_users (user_name, username, user_password) VALUES (?, ?, ?)";
        if ($insertStmt = mysqli_prepare($link, $insertQuery)) {
            mysqli_stmt_bind_param($insertStmt, 'sss', $_REQUEST["signup-name"], $_REQUEST["signup-username"], $hashedPassword);
            mysqli_stmt_execute($insertStmt);
            $insertedRows = mysqli_stmt_affected_rows($insertStmt);
            if ($insertedRows > 0) {
                // Set session variables after successful signup
                $_SESSION['verify'] = true;
                $_SESSION['userID'] = $link->insert_id; // Assuming you want to use the newly inserted user's ID
                $_SESSION['user_name'] = $_REQUEST["signup-name"];
                $_SESSION['logged_in'] = true;
                $_SESSION['name'] = $_REQUEST["signup-username"];

                $results[] = [
                    "verify" => true,
                    "insertedRows" => $insertedRows,
                    "success" => "Login successful",
                    "userID" => $link->insert_id,
                    "username" => $_REQUEST["signup-username"]
                ];
            } else {
                throw new Exception("No rows were inserted");
            }
        } else {
            throw new Exception("Prepared statement did not insert records.");
        }

    } catch (Exception $error) {
        $results[] = ["error" => $error->getMessage()];
    } finally {
        echo json_encode($results);
    }
?>