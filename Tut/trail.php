<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newData = array(
        "email" => filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL),
        "password" => isset($_POST["password"]) ? password_hash($_POST["password"], PASSWORD_DEFAULT) : "",
        "check" => $_POST["check"] ?? "",
        "text" => $_POST["text"] ?? "",

    );

    file_put_contents("E:\\XAMPP\\htdocs\\Tut\\test.json", "Test data", FILE_APPEND);

    $jsonFile = "E:\\XAMPP\\htdocs\\Tut\\test.json";
    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);

    if (!is_array($data)) {
        $data = array();
    }

    // Add new data
    $data[] = $newData;

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "json_encode error: " . json_last_error_msg();
    }

    if (file_put_contents($jsonFile, $jsonData) !== false) {
        echo "Data has been written to $jsonFile.";
    } else {
        echo "Error occurred while writing to $jsonFile.";
    }
}
?>
