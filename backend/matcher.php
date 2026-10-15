hjk<?php
error_reporting(0);
ini_set('display_errors', 0);

require_once 'db.php';
require_once 'movies.php'; // To reuse mapTmdbMovie or tmdb API

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "Valid user_id required"]);
    exit;
}

try {
    $pdo = getDB();
    
    // 1. Get movies liked by the current user (rating >= 7)
    $stmt = $pdo->prepare("SELECT movie_id FROM reviews WHERE user_id = ? AND rating >= 7");
    $stmt->execute([$userId]);
    $likedMovies = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($likedMovies)) {
        // Fallback: If no high ratings, return empty (frontend can handle fallback)
        echo json_encode([]);
        exit;
    }

    $inClause = implode(',', array_fill(0, count($likedMovies), '?'));

    // 2. Find other users who liked the SAME movies
    $stmt2 = $pdo->prepare("
        SELECT user_id, COUNT(*) as shared_likes 
        FROM reviews 
        WHERE movie_id IN ($inClause) AND rating >= 7 AND user_id != ? 
        GROUP BY user_id 
        ORDER BY shared_likes DESC 
        LIMIT 10
    ");
    $params2 = $likedMovies;
    $params2[] = $userId;
    $stmt2->execute($params2);
    $similarUsers = $stmt2->fetchAll(PDO::FETCH_COLUMN, 0);

    if (empty($similarUsers)) {
        echo json_encode([]);
        exit;
    }

    $similarUsersIn = implode(',', array_fill(0, count($similarUsers), '?'));

    // 3. Find movies liked by similar users, that the current user hasn't reviewed yet
    $stmt3 = $pdo->prepare("
        SELECT movie_id, COUNT(*) as score
        FROM reviews 
        WHERE user_id IN ($similarUsersIn) 
          AND rating >= 7 
          AND movie_id NOT IN (SELECT movie_id FROM reviews WHERE user_id = ?)
        GROUP BY movie_id 
        ORDER BY score DESC 
        LIMIT 6
    ");
    $params3 = $similarUsers;
    $params3[] = $userId;
    $stmt3->execute($params3);
    $recommendedMovieIds = $stmt3->fetchAll(PDO::FETCH_COLUMN, 0);

    if (empty($recommendedMovieIds)) {
        echo json_encode([]);
        exit;
    }

    // 4. Fetch movie details from TMDB or local cache for these recommended IDs
    $finalRecommendations = [];
    foreach ($recommendedMovieIds as $mid) {
        $res = fetchFromTMDB('/movie/' . $mid);
        if ($res && !isset($res['status_code'])) {
            $mapped = mapTmdbMovie($res);
            $finalRecommendations[] = $mapped;
        }
    }

    echo json_encode($finalRecommendations);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Internal Server Error", "error" => $e->getMessage()]);
}
?>
