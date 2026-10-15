<?php
$_SERVER['REQUEST_METHOD'] = 'POST'; // Prevent movies.php from running API logic
require_once 'tmdb_config.php';
require_once 'movies.php';

$movies = getWorldwideMovies();

foreach ($movies as $m) {
    $id = $m['id'];
    $res = fetchFromTMDB('/movie/' . $id);
    if ($res && isset($res['poster_path'])) {
        $poster = 'https://image.tmdb.org/t/p/w500' . $res['poster_path'];
        $backdrop = 'https://image.tmdb.org/t/p/w1280' . $res['backdrop_path'];
        echo $m['title'] . ":\n";
        echo "  image_url: " . $poster . "\n";
        echo "  backdrop_url: " . $backdrop . "\n\n";
    } else {
        echo $m['title'] . ": FAILED\n\n";
    }
    usleep(200000); // 200ms delay
}
?>
