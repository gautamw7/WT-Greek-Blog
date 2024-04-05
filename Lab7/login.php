<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start the session
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $submittedUsername = $_POST["Username"] ?? "";
    $submittedPassword = $_POST["password"] ?? ""; // Ensure these field names match your form

    $jsonFile = "E:\\XAMPP\\htdocs\\Lab7\\userData.json";
    if (!file_exists($jsonFile)) {
        echo "<script>alert('Database file not found.');</script>";
        exit; // Prevent further execution if the database file doesn't exist
    }

    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);

    if (!is_array($data)) {
        echo "<script>alert('No users found in database.');</script>";
        exit; // No valid data found in JSON, so we exit
    }

    $userFound = false;
    $passwordIsCorrect = false;
    $UserData = null;
    foreach ($data as $user) {
        if ($user["username"] === $submittedUsername || $user["Email"] === $submittedUsername) {
            $userFound = true;
            // Now check if the submitted password matches the one stored (hashed) for this user
            if (password_verify($submittedPassword, $user["Password"])) {
                $UserData = $user;
                $passwordIsCorrect = true;

            }
            break; // No need to continue the loop once the user is found
        }
    }

    if ($userFound && $passwordIsCorrect) {
        // Store the username in a session variable
        $_SESSION["username"] = $UserData["username"];
        $usernameForRedirect = $UserData["username"];
        echo "<script>alert('Successful login.');</script>";
        header("Location: HomePage.html?username=" . urlencode($usernameForRedirect));
        exit;
    } elseif ($userFound) {
        echo "<script>alert('Password incorrect. Please try again.');</script>";
    } else {
        echo "<script>alert('No such user exists. Please check your email/username.');</script>";
    }
}
?>
