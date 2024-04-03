<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prepare the data array
    $newData = array(
        "Name" => $_POST["name"] ?? "",
        "Email" => $_POST["email"] ?? "",
        "username" => $_POST["SignUpUserName"] ?? "",
        "Password" => isset($_POST["Password1"]) ? password_hash($_POST["Password1"], PASSWORD_DEFAULT) : "",
        "ConfirmPassword" => isset($_POST["ConfirmPassword"]) ? password_hash($_POST["ConfirmPassword"], PASSWORD_DEFAULT) : ""
    );

    // Specify the path to the JSON file
    $jsonFile = "E:\\XAMPP\\htdocs\\Lab7\\userData.json";

    // Initialize a flag to check for existing email
    $emailExists = false;

    // Try to read the existing JSON data from the file
    if (file_exists($jsonFile)) {
        $jsonData = file_get_contents($jsonFile);
        $data = json_decode($jsonData, true);

        // Check if the data is not an array (indicating the file is empty or contains invalid JSON)
        if (!is_array($data)) {
            $data = array(); // Initialize as an empty array
        } else {
            // Iterate through existing data to check for the same email
            foreach ($data as $entry) {
                if (isset($entry["Email"]) && $entry["Email"] === $newData["Email"]) {
                    $emailExists = true;
                    break;
                }
            }
        }
    } else {
        // File doesn't exist, so start with an empty array
        $data = array();
    }

    if ($emailExists) {
        // Alert the user that the email is already used
        echo "<script>alert('The email is already used. Please use a different email.');</script>";
    } else {
        // Append the new data to the existing array if email is not found
        $data[] = $newData;

        // Convert the updated data back to JSON
        $jsonData = json_encode($data, JSON_PRETTY_PRINT);
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "<script>alert('There is an error .');</script>";
            exit; // Exit if there was an error with JSON encoding
        }

        // Write the updated JSON data back to the file
        if (file_put_contents($jsonFile, $jsonData) !== false) {
            echo "<script>alert('Sign Up successful.');</script>";
        } else {
            echo "<script>alert('There is an error .');</script>";
        }
    }
}

?>
