<?php
// TMDB API Configuration
// Replace this placeholder with your actual TMDB API Key!
// Get a free key at https://www.themoviedb.org/documentation/api
define('TMDB_API_KEY', '98dc594e190ca9f936aa168c9298962d');
define('TMDB_BASE_URL', 'https://api.themoviedb.org/3');

function fetchFromTMDB($endpoint) {
    $url = TMDB_BASE_URL . $endpoint;
    $separator = (strpos($url, '?') !== false) ? '&' : '?';
    $url .= $separator . 'api_key=' . TMDB_API_KEY;

    if (strpos($endpoint, '/search/') !== false || strpos($endpoint, '/discover/') !== false) {
        $url .= '&include_adult=false';
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    }
    return null;
}
?>
