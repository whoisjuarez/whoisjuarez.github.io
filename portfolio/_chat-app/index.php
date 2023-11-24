<?php
   ini_set('display_errors', '1');
   ini_set('display_startup_errors', '1');
   error_reporting(E_ALL);

   require_once("db/db_connect.php");

   if(isset($_POST["username"]) && !empty($_POST["username"]) && $_POST["username"] != " "){
      $username = trim(strip_tags($_POST["username"]));
      $password = trim(strip_tags($_POST["password"]));

      $user = $connect->real_escape_string($username);
      $pass = $connect->real_escape_string($password);

      $query = "SELECT * FROM users WHERE username = '$username'";
      $result = mysqli_query($connect, $query);

      if(mysqli_num_rows($result) == 0){
         echo "<p>User not found</p>";
          exit();
      }

      $user_data = mysqli_fetch_assoc($result);

      if(password_verify($password, $user_data["password"])){
         session_start();
         $_SESSION["username"] = $username;
         $_SESSION["id"] = $user_data["id"];
         $_SESSION["logged_in"] = true;
      }
   }
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>PHP Chat app & simple Login</title>

   <!-- Favicon -->
   <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicon/apple-touch-icon.png">
   <link rel="icon" type="image/png" sizes="512x512" href="assets/img/favicon/android-chrome-512x512.png">
   <link rel="icon" type="image/png" sizes="192x192" href="assets/img/favicon/android-chrome-192x192.png">
   <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon/favicon-16x16.png">
   <link rel="manifest" href="/site.webmanifest">

   <!-- Google Fonts -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;300;400;700;900&display=swap" rel="stylesheet">

   <!-- Font Awesome -->
   <script src="https://kit.fontawesome.com/2f6fae777f.js" crossorigin="anonymous"></script>

   <!-- CSS -->
   <link rel="stylesheet" href="assets/css/chat_style.css">
</head>
<body>
   <?php if(isset($_SESSION["logged_in"]) 
         && $_SESSION["logged_in"] === true) : ?>
      
      <main class="container">
         <header class="welcome-box container">
            <div class="card-logo">
               <img src="assets/img/logo_blah.svg" alt="">
            </div>
            
            <div class="card">
               <h2>Welcome, <?php print $_SESSION["username"]; ?> :)</h2>
            </div>
            
            <div class="card-btn">
               <a href="logout.php" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i></a>
            </div>
         </header>

         <div class="message-list">
            <article class="messages">
               <p id=messages>LOADING</p>
            </article>
         </div>
        
         <form id="msg-box" class="container">
            <input class="input-msg" type="text" placeholder="Type a message" name="msg">
            <button class="btn-send" type="submit" value="Post it!"><i class="fa-solid fa-paper-plane"></i></button>
         </form>
      </main>

      <script>
         window.myUserId = <?php echo($_SESSION["id"]) ?>;
      </script>
      <script src="assets/js/chat_script.js" defer></script>

   <!-- Login -->
   <?php elseif($_SERVER["REQUEST_METHOD"] == "POST") : ?>
      <!-- <a href="./index.php">Try again!</a> -->
      <section class="login-page container">
         <img src="assets/img/logo_blah.svg" alt="">
         
         <h2 class="error-login">You have entered incorrect username or password</h2>
         
         <h1>Please, log in</h1>
         
         <p class="tip">Try username: <strong>peter</strong> and password: <strong>pizza123</strong> or username: <strong>mary</strong> and password: <strong>pasta123</strong></p>
         
         <form class="form-login"  action="./index.php" method="POST">
            <input class="input-login" type="text" name="username" placeholder="User name" pattern = ".{3,}" required>
            <input class="input-login" type="password" name="password" placeholder="Password" pattern = ".{7,}" required>
            <button class="btn-login" type="submit" name="submit"><i class="fa-solid fa-right-to-bracket"></i></button>
         </form>
      </section>

   <?php else : ?>
      <section class="login-page container">
         <img src="assets/img/logo_blah.svg" alt="">
         
         <h1>Please, log in</h1>
         
         <p class="tip">Try username: <strong>peter</strong> and password: <strong>pizza123</strong> or username: <strong>mary</strong> and password: <strong>pasta123</strong></p>
         
         <form class="form-login"  action="./index.php" method="POST">
            <input class="input-login" type="text" name="username" placeholder="User name" pattern = ".{3,}" required>
            <input class="input-login" type="password" name="password" placeholder="Password" pattern = ".{7,}" required>
            <button class="btn-login" type="submit" name="submit"><i class="fa-solid fa-right-to-bracket"></i></button>
         </form>
      </section>
   <?php endif; ?>
</body>
</html>