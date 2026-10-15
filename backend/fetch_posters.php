<?php
require_once 'tmdb_config.php';
require_once 'movies.php';

$movies = getWorldwideMovies();

foreach ($movies as $m) {
    $id = $m['id'];
    $res = fetchFromTMDB('/movie/' . $id);
    if ($res && !isset($res['status_code'])) {
        $img = isset($res['poster_path']) && $res['poster_path'] ? 'https://image.tmdb.org/t/p/w500' . $res['poster_path'] : '';
        $bg = isset($res['backdrop_path']) && $res['backdrop_path'] ? 'https://image.tmdb.org/t/p/w1280' . $res['backdrop_path'] : '';
        echo "ID: $id | Title: " . $m['title'] . "\n";
        echo "Image: $img\n";
        echo "Backdrop: $bg\n\n";
    } else {
        echo "Failed for ID: $id (" . ($res['status_message'] ?? 'Unknown Error') . ")\n\n";
    }
    usleep(250000); // 250ms delay
}
?>
