<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Support dedicated cinesphere_user (for AWS EC2) and root with no password (for local XAMPP)
$conn = null;
$credentials = [
    ['user' => 'cinesphere_user', 'pass' => 'CineSphere@2026'],
    ['user' => 'root', 'pass' => ''],
    ['user' => 'movieuser', 'pass' => '1234']
];

$last_error = '';
foreach ($credentials as $cred) {
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $cred['user'], $cred['pass'], [
            PDO::ATTR_TIMEOUT => 2,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        break; // Successfully connected!
    } catch(PDOException $e) {
        $last_error = $e->getMessage();
    }
}

if (!$conn) {
    echo json_encode(["error" => "Connection error: " . $last_error]);
    exit;
}
?>
