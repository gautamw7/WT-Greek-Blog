<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json'); // Ensure JSON response

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonFile = "E:\\XAMPP\\htdocs\\Lab7\\data.json";
    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);

    if (!is_array($data)) {
        $data = []; // Initialize as an empty array if data is not an array
    }

    $lastId = !empty($data) ? end($data)["id"] : 0;

    // Prepare new data entry
    $newData = [
        "id" => $lastId + 1,
        "author" => $_POST["name"] ?? "",
        "title" => $_POST["Title"] ?? "",
        "img_url" => $_POST["image"] ?? "",
        "content" => $_POST["message"] ?? "",
        "date" => date("F j, Y")
    ];

    // Append new data
    $data[] = $newData;

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    if (json_last_error() !== JSON_ERROR_NONE) {
        // Return error message in JSON format
        echo json_encode(["error" => "JSON encode error: " . json_last_error_msg()]);
        exit;
    }

    if (file_put_contents($jsonFile, $jsonData) !== false) {
        // Success response
        echo json_encode(["message" => "Data has been written to $jsonFile."]);
    } else {
        // Error response
        echo json_encode(["error" => "Error occurred while writing to $jsonFile."]);
        exit;
    }
} else {
    // Method not allowed
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

?>
