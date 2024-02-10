<?php
session_start();

// Include the database connection file
require_once '_includes/db_connect.php';

// Function to select a user by username
function selectUser($link, $username)
{
    $stmt = mysqli_prepare($link, "SELECT * FROM relational_users WHERE user_name = ?");
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        throw new Exception('Database query error: ' . mysqli_error($link));
    }

    $user = mysqli_fetch_assoc($result);

    if (!$user) {
        throw new Exception('User does not exist');
    }

    return $user;
}

try {
    // Check if the user has submitted the login form
    if (isset($_REQUEST["signin-username"]) && isset($_REQUEST["signin-password"])) {
        $username = $_REQUEST["signin-username"];
        $password = $_REQUEST["signin-password"];

        // Get user information by username
        $user = selectUser($link, $username);

        // Verify the password
        if (password_verify($password, $user['user_password'])) {
            // Password is correct
            // Set session variables
            $_SESSION['verify'] = true;
            $_SESSION['userID'] = $user['userID'];
            $_SESSION['user_name'] = $user['user_name'];
            $_SESSION['logged_in'] = true;

            $response = [
                "success" => "Login successful",
                "sessionData" => [
                    "verify" => true,
                    "userID" => $user['userID'],
                    "user_name" => $user['user_name'],
                    "logged_in" => true
                ]
            ];
        } else {
            // Password is incorrect
            throw new Exception('Incorrect password');
        }
    } else {
        throw new Exception('Required data is missing (username or password)');
    }
} catch (Exception $error) {
    // Handle errors by storing them in an error array
    $errors = ["error" => $error->getMessage()];
}

// Close the database connection
mysqli_close($link);

// Respond with JSON containing results or errors
if (isset($errors)) {
    echo json_encode($errors);
} else {
    // You can return a success message or redirect to another page
    echo json_encode($response);
}
?>