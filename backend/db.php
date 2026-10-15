<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db_name = 'cinesphere_db';

// SYSTEM SENDER EMAIL (The Gmail account that sends the links)
define('SMTP_USER', 'official.cinesphere@gmail.com'); 
define('SMTP_PASS', 'bhvj yvjb rqov fqzg'); // 16-character Google App Password
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);

// Support dedicated cinesphere_user (for AWS EC2) and root with no password (for local XAMPP)
$conn = null;
$hosts = ['127.0.0.1', 'localhost'];
$credentials = [
    ['user' => 'cinesphere_user', 'pass' => 'CineSphere@2026'],
    ['user' => 'root', 'pass' => ''],
    ['user' => 'movieuser', 'pass' => '1234']
];

$last_error = '';
foreach ($hosts as $h) {
    foreach ($credentials as $cred) {
        try {
            $conn = new PDO("mysql:host=" . $h . ";dbname=" . $db_name . ";charset=utf8mb4", $cred['user'], $cred['pass'], [
                PDO::ATTR_TIMEOUT => 2,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
            break 2; // Successfully connected!
        } catch(PDOException $e) {
            $last_error = $e->getMessage();
        }
    }
}

if (!$conn) {
    echo json_encode(["error" => "Connection error: " . $last_error]);
    exit;
}
?>
