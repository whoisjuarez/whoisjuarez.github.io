<?php
    session_start();
    session_destroy();
    echo 'You have been logged out, goodbye. <a href="index.php">Wanna try again?</a>';
    header("location: index.php");
?>