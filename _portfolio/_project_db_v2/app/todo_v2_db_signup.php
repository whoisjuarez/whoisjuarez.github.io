<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($_POST["name_signup"]) || trim($_POST["name_signup"]) === "") {
  die("Name is required");
}

if (!filter_var($_POST["email_signup"], FILTER_VALIDATE_EMAIL)) {
  die("Invalid email");
}

if (strlen($_POST["password_signup"]) < 8) {
  die("Password must be at least 8 characters and have at least 1 letter and 1 number");
}

if ( ! preg_match("/[a-z]/i", $_POST["password_signup"])) {
  die("Password must be at least 8 characters and have at least 1 letter and 1 number");
}

if ( ! preg_match("/[0-9]/", $_POST["password_signup"])) {
  die("Password must be at least 8 characters and have at least 1 letter and 1 number");
}

if ($_POST["password_signup"] !== $_POST["password_confirmation"]) {
  die("Passwords do not match");
}

$password_hash = password_hash($_POST["password_signup"], PASSWORD_DEFAULT);

$link = require_once "_includes/todo_db_connect.php";

$query = "INSERT INTO todo_users (name, email, password_hash) VALUES (?, ?, ?)";

$stmt = $link->prepare($query);

if ($stmt === false) {
  die("Failed to prepare statement");
}

$stmt->bind_param("sss", $_POST["name_signup"], $_POST["email_signup"], $password_hash);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
  exit;
} else {

  if ($link->errno === 1062) {
    die("Email already in use");
  } else {

    die($link->error . " " . $link->errno);
  }
}

$stmt->close();

print_r($_POST);