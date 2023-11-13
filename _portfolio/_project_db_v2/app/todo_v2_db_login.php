<?php
session_start();

require_once '_includes/todo_db_connect.php';

function selectUser($link, $email)
{
    $stmt = mysqli_prepare($link, "SELECT * FROM todo_users WHERE email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        throw new Exception('Database query error: ' . mysqli_error($link));
    }

    $user = mysqli_fetch_assoc($result);

    if (!$user) {
        throw new Exception('User ' . $email . ' does not exist');
    }

    return $user;
}

// retrieve the JSON data from the request body
$data_json = file_get_contents('php://input');
// convert the JSON data to a PHP array
$data = json_decode($data_json, true);

try {
    if (isset($data["email"]) && isset($data["password"])) {
        $email = $data["email"];
        $password = $data["password"];

        $user = selectUser($link, $email);

        if (password_verify($password, $user['password_hash'])) {
            // Set session variables
            $_SESSION['verify'] = true;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['logged_in'] = true;

            $response = [
                "success" => "Password successfully verified",
                "sessionData" => [
                    "verify" => true,
                    "user_id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "logged_in" => true
                ]
            ];
        } else {
            throw new Exception('Incorrect password');
        }
    } else {
        throw new Exception('Required data is missing (email or password)');
    }
} catch (Exception $error) {
    // Handle errors by storing them in an error array
    $errors = ["error" => $error->getMessage()];
}

mysqli_close($link);

// Respond with JSON containing results or errors
if (isset($errors)) {
    echo json_encode($errors);
} else {
    echo json_encode($response);
}
?>



