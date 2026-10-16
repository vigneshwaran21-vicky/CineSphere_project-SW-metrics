<?php

error_reporting(0);
ini_set('display_errors', 0);

require_once 'tmdb_config.php';


function getWorldwideMovies() {
    return [
        // English
        [
            "id" => 557,
            "title" => "Spider-Man",
            "genre" => "Action, Sci-Fi",
            "rating" => 7.3,
            "release_date" => "2002-05-01",
            "original_language" => "EN",
            "description" => "After being bitten by a genetically altered spider, nerdy high school student Peter Parker combines his web-slinging abilities to fight crime.",
            "image_url" => "https://image.tmdb.org/t/p/w500/or6XJBVpcEbIkma0V9zshnbEtx4.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg"
        ],
        [
            "id" => 155,
            "title" => "The Dark Knight",
            "genre" => "Action, Crime, Drama",
            "rating" => 8.5,
            "release_date" => "2008-07-16",
            "original_language" => "EN",
            "description" => "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent to dismantle mob organizations.",
            "image_url" => "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/9FE5eD92WfVCiivM9Pq9GVSrlWk.jpg"
        ],
        [
            "id" => 27205,
            "title" => "Inception",
            "genre" => "Action, Sci-Fi, Adventure",
            "rating" => 8.4,
            "release_date" => "2010-07-15",
            "original_language" => "EN",
            "description" => "Cobb, a skilled thief who steals secrets from deep within the subconscious during dream state, is offered redemption.",
            "image_url" => "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg"
        ],
        [
            "id" => 157336,
            "title" => "Interstellar",
            "genre" => "Adventure, Drama, Sci-Fi",
            "rating" => 8.4,
            "release_date" => "2014-11-05",
            "original_language" => "EN",
            "description" => "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            "image_url" => "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/vgnoBSVzWAV9sNQUORaDGvDp7wx.jpg"
        ],
        [
            "id" => 76600,
            "title" => "Avatar: The Way of Water",
            "genre" => "Sci-Fi, Adventure, Action",
            "rating" => 7.6,
            "release_date" => "2022-12-14",
            "original_language" => "EN",
            "description" => "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
            "image_url" => "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/kJsPVzdyBrYHLomuNv5SJDXUQ2f.jpg"
        ],

        // Hindi (Bollywood)
        [
            "id" => 579974,
            "title" => "RRR",
            "genre" => "Action, Drama, History",
            "rating" => 7.8,
            "release_date" => "2022-03-24",
            "original_language" => "HI",
            "description" => "A tale of two legendary revolutionaries and their journey far away from home.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],
        [
            "id" => 360814,
            "title" => "Dangal",
            "genre" => "Drama, Family",
            "rating" => 8.0,
            "release_date" => "2016-12-21",
            "original_language" => "HI",
            "description" => "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],
        [
            "id" => 868759,
            "title" => "Pathaan",
            "genre" => "Action, Adventure, Thriller",
            "rating" => 6.7,
            "release_date" => "2023-01-25",
            "original_language" => "HI",
            "description" => "An Indian secret agent takes on the leader of a group of mercenaries who has nefarious plans for his homeland.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],
        [
            "id" => 872906,
            "title" => "Jawan",
            "genre" => "Action, Thriller",
            "rating" => 7.2,
            "release_date" => "2023-09-07",
            "original_language" => "HI",
            "description" => "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],
        [
            "id" => 20453,
            "title" => "3 Idiots",
            "genre" => "Comedy, Drama",
            "rating" => 8.0,
            "release_date" => "2009-12-23",
            "original_language" => "HI",
            "description" => "Two friends are searching for their long lost companion in an inspiring story about college friendship.",
            "image_url" => "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/8gT3UKtglLVpu0YfccwbmXZ5Eis.jpg"
        ],

        // Tamil (Kollywood)
        [
            "id" => 949429,
            "title" => "Leo",
            "genre" => "Action, Crime, Thriller",
            "rating" => 7.2,
            "release_date" => "2023-10-19",
            "original_language" => "TA",
            "description" => "Things turn turbulent for a mild-mannered cafe owner in Himachal Pradesh when he catches the attention of a drug cartel.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/7/75/Leo_%282023_Indian_film%29.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/mOQV573Tr0WxI2VVOLKwtfaRGZH.jpg"
        ],
        [
            "id" => 934632,
            "title" => "Jailer",
            "genre" => "Action, Crime",
            "rating" => 7.1,
            "release_date" => "2023-08-10",
            "original_language" => "TA",
            "description" => "A retired jailer goes on a rampage to find his son's killers and uncovers a massive idol smuggling network.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],
        [
            "id" => 725201,
            "title" => "Vikram",
            "genre" => "Action, Thriller",
            "rating" => 8.1,
            "release_date" => "2022-06-03",
            "original_language" => "TA",
            "description" => "A high-octane action thriller following a special ops squad investigating a series of masked vigilante murders.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],

        // Telugu (Tollywood)
        [
            "id" => 350312,
            "title" => "Baahubali 2: The Conclusion",
            "genre" => "Action, Adventure, Fantasy",
            "rating" => 7.9,
            "release_date" => "2017-04-27",
            "original_language" => "TE",
            "description" => "Shiva, the son of Bahubali, begins to search for answers after learning about his heritage.",
            "image_url" => "https://image.tmdb.org/t/p/w500/21sC2assImQIYCEDA84Qh9d1RsK.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/whNjsTOUVg2lZLCKgGhnACnmV8E.jpg"
        ],
        [
            "id" => 693134,
            "title" => "Pushpa: The Rise",
            "genre" => "Action, Crime, Drama",
            "rating" => 7.6,
            "release_date" => "2021-12-17",
            "original_language" => "TE",
            "description" => "Story of Pushpa Raj, a laborer who rises through the ranks of a red sandalwood smuggling syndicate.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/7/75/Pushpa_-_The_Rise_%282021_film%29.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],
        [
            "id" => 601796,
            "title" => "K.G.F: Chapter 2",
            "genre" => "Action, Crime, Drama",
            "rating" => 8.1,
            "release_date" => "2022-04-14",
            "original_language" => "TE",
            "description" => "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes while his allies look up to him.",
            "image_url" => "https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg",
            "backdrop_url" => "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80"
        ],

        // Japanese (Anime & Cinema)
        [
            "id" => 129,
            "title" => "Spirited Away",
            "genre" => "Animation, Family, Fantasy",
            "rating" => 8.5,
            "release_date" => "2001-07-20",
            "original_language" => "JA",
            "description" => "A young girl, Chihiro, becomes trapped in a strange world of spirits and must work to free her parents.",
            "image_url" => "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/dyJvKsNs2KP8qQnAXbRwDjblViy.jpg"
        ],
        [
            "id" => 372058,
            "title" => "Your Name.",
            "genre" => "Animation, Romance, Drama",
            "rating" => 8.5,
            "release_date" => "2016-08-26",
            "original_language" => "JA",
            "description" => "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
            "image_url" => "https://image.tmdb.org/t/p/w500/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/8x9iKH8kWA0zdkgNdpAew7OstYe.jpg"
        ],
        [
            "id" => 635302,
            "title" => "Demon Slayer: Mugen Train",
            "genre" => "Animation, Action, Fantasy",
            "rating" => 8.3,
            "release_date" => "2020-10-16",
            "original_language" => "JA",
            "description" => "Tanjiro and the group join Flame Hashira Kyojuro Rengoku aboard the Mugen Train to battle a powerful demon.",
            "image_url" => "https://image.tmdb.org/t/p/w500/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/qjGrUmKW78MCFG8PTLDBp67S27p.jpg"
        ],

        // Korean
        [
            "id" => 496243,
            "title" => "Parasite",
            "genre" => "Comedy, Thriller, Drama",
            "rating" => 8.5,
            "release_date" => "2019-05-30",
            "original_language" => "KO",
            "description" => "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            "image_url" => "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/vbC0rzdrb7Ohc2TkbEbxtOABECe.jpg"
        ],
        [
            "id" => 396535,
            "title" => "Train to Busan",
            "genre" => "Action, Horror, Thriller",
            "rating" => 7.8,
            "release_date" => "2016-07-20",
            "original_language" => "KO",
            "description" => "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
            "image_url" => "https://image.tmdb.org/t/p/w500/vNVFt6dtcqnI7hqa6LFBUibuFiw.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/brnfCYyz8EMbBrHgmh8sCwBi5i1.jpg"
        ],

        // German
        [
            "id" => 49046,
            "title" => "All Quiet on the Western Front",
            "genre" => "Action, Drama, War",
            "rating" => 7.7,
            "release_date" => "2022-10-07",
            "original_language" => "DE",
            "description" => "A young German soldier's terrifying experiences and distress on the western front during World War I.",
            "image_url" => "https://image.tmdb.org/t/p/w500/2IRjbi9cADuDMKmHdLK7LaqQDKA.jpg",
            "backdrop_url" => "https://image.tmdb.org/t/p/w1280/xBwtP27cx8WfjHJVFkpuV6F1RES.jpg"
        ]
    ];
}

function isSafeMovie($m) {
    if (isset($m['adult']) && ($m['adult'] === true || $m['adult'] === 1)) {
        return false;
    }
    
    $title = strtolower(($m['title'] ?? '') . ' ' . ($m['original_title'] ?? '') . ' ' . ($m['name'] ?? ''));
    $overview = strtolower($m['overview'] ?? $m['description'] ?? '');
    $fullText = $title . ' ' . $overview;

    $adultBlacklist = [
        'hotel desire', 'jan dara', 'erotic', 'erotica', 'softcore', 'porn', 'playboy', 
        'nsfw', '18+ adult', 'x-rated', 'hentai', 'sensual story', 'desire', 'nude', 'naked', 
        'fifty shades', '365 days', 'nymphomaniac', 'lust', 'kama sutra', 'basic instinct', 
        'intimacy', 'unfaithful', 'striptease', 'sexuality', 'explicit sex', 'orgasm'
    ];

    foreach ($adultBlacklist as $word) {
        if (strpos($fullText, $word) !== false) {
            return false;
        }
    }
    return true;
}

function mapTmdbMovie($m) {
    // Manual overrides for movies that TMDB might misinterpret or lack posters for
    $MANUAL_POSTERS = [
        "Leo" => "https://image.tmdb.org/t/p/w500/z3SeS4wjKQ3TjHSvRidovGJbHYb.jpg", // Thalapathy Vijay's Leo
        "Vikram" => "https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg", // Kamal Haasan's Vikram
        "Jawan" => "https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
        "Pathaan" => "https://image.tmdb.org/t/p/w500/liLN69YgoovHVgmlHJ876PKi5Yi.jpg"
    ];

    $backdrop = isset($m['backdrop_path']) && $m['backdrop_path'] ? 'https://image.tmdb.org/t/p/w1280' . $m['backdrop_path'] : null;
    $title = $m['title'] ?? $m['name'] ?? 'Unknown';
    
    // Check manual override first
    if (array_key_exists($title, $MANUAL_POSTERS)) {
        $poster = $MANUAL_POSTERS[$title];
    } else {
        $poster = isset($m['poster_path']) && $m['poster_path'] ? 'https://image.tmdb.org/t/p/w500' . $m['poster_path'] : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80';
    }

    return [
        "id" => $m['id'],
        "title" => $title,
        "genre" => "Feature Film",
        "rating" => isset($m['vote_average']) ? round($m['vote_average'], 1) : 0,
        "release_date" => $m['release_date'] ?? $m['first_air_date'] ?? null,
        "original_language" => strtoupper($m['original_language'] ?? 'EN'),
        "description" => $m['overview'] ?? '',
        "image_url" => $poster,
        "backdrop_url" => $backdrop
    ];
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$action = isset($_GET['action']) ? $_GET['action'] : 'all';

if ($_SERVER['REQUEST_METHOD'] === 'GET' || !isset($_SERVER['REQUEST_METHOD'])) {
    $worldwide = getWorldwideMovies();

    if ($action === 'all') {
        $tmdb_popular = fetchFromTMDB('/movie/popular');
        if ($tmdb_popular && isset($tmdb_popular['results']) && count($tmdb_popular['results']) > 0) {
            $filtered = array_values(array_filter($tmdb_popular['results'], 'isSafeMovie'));
            $mapped = array_map('mapTmdbMovie', $filtered);
            echo json_encode(array_merge($mapped, $worldwide));
        } else {
            echo json_encode($worldwide);
        }
    } elseif ($action === 'top_rated') {
        $tmdb_top = fetchFromTMDB('/movie/top_rated');
        if ($tmdb_top && isset($tmdb_top['results']) && count($tmdb_top['results']) > 0) {
            $filtered = array_values(array_filter($tmdb_top['results'], 'isSafeMovie'));
            $mapped = array_map('mapTmdbMovie', $filtered);
            echo json_encode(array_merge($mapped, array_reverse($worldwide)));
        } else {
            echo json_encode(array_reverse($worldwide));
        }
    } elseif ($action === 'discover') {
        $genre = isset($_GET['genre']) ? $_GET['genre'] : '';
        $lang = isset($_GET['language']) ? strtoupper($_GET['language']) : '';
        $sort = isset($_GET['sort']) ? $_GET['sort'] : 'popularity.desc';
        
        $params = [];
        if (!empty($genre)) $params[] = "with_genres=" . urlencode($genre);
        if (!empty($lang)) $params[] = "with_original_language=" . urlencode(strtolower($lang));
        if (!empty($sort)) $params[] = "sort_by=" . urlencode($sort);
        
        $endpoint = '/discover/movie' . (count($params) > 0 ? '?' . implode('&', $params) : '');
        $res = fetchFromTMDB($endpoint);
        
        $results = [];
        if ($res && isset($res['results']) && count($res['results']) > 0) {
            $filtered = array_values(array_filter($res['results'], 'isSafeMovie'));
            $results = array_map('mapTmdbMovie', $filtered);
        }
        
        // Filter local worldwide movies matching requested language
        $localFiltered = $worldwide;
        if (!empty($lang)) {
            $localFiltered = array_values(array_filter($worldwide, function($m) use ($lang) {
                return strtoupper($m['original_language']) === $lang;
            }));
        }
        
        $final = array_merge($results, $localFiltered);
        echo json_encode(count($final) > 0 ? $final : $worldwide);

    } elseif ($action === 'search') {
        $rawQuery = isset($_GET['q']) ? trim($_GET['q']) : '';
        if (!empty($rawQuery)) {
            // Strip filler words like 'movie', 'movive', 'film', etc.
            $cleanTerm = trim(preg_replace('/\b(movies?|movives?|films?|cinemas?|padams?|padangals?|in\s+tamil|in\s+telugu|in\s+hindi|in\s+english)\b/i', '', $rawQuery));
            $searchTerm = !empty($cleanTerm) ? $cleanTerm : $rawQuery;
            $lowerTerm = strtolower($searchTerm);

            $results = [];
            $res = fetchFromTMDB('/search/movie?query=' . urlencode($searchTerm));
            if ($res && isset($res['results']) && count($res['results']) > 0) {
                $filtered = array_values(array_filter($res['results'], 'isSafeMovie'));
                $results = array_map('mapTmdbMovie', $filtered);
            }

            // Special handling for queries matching "hi":
            // Include both the Tamil release "Hi :)" and the famous "Hi Nanna" (released/dubbed in Tamil/Telugu)
            if ($lowerTerm === 'hi' || strpos($lowerTerm, 'hi') !== false) {
                $extraRes = fetchFromTMDB('/search/movie?query=' . urlencode('hi nanna'));
                if ($extraRes && isset($extraRes['results'])) {
                    $filteredExtra = array_values(array_filter($extraRes['results'], 'isSafeMovie'));
                    $mappedExtra = array_map('mapTmdbMovie', $filteredExtra);
                    foreach (array_reverse($mappedExtra) as $extraM) {
                        $results = array_values(array_filter($results, function($r) use ($extraM) {
                            return (string)$r['id'] !== (string)$extraM['id'];
                        }));
                        array_unshift($results, $extraM);
                    }
                }
                // Boost exact titles ("Hi :)", "Hi Nanna", "Hi") and Tamil releases
                usort($results, function($a, $b) {
                    $scoreA = 0; $scoreB = 0;
                    $tA = strtolower($a['title'] ?? '');
                    $tB = strtolower($b['title'] ?? '');
                    if ($tA === 'hi :)' || $tA === 'hi nanna' || $tA === 'hi') $scoreA += 50;
                    if ($tB === 'hi :)' || $tB === 'hi nanna' || $tB === 'hi') $scoreB += 50;
                    if (strtoupper($a['original_language'] ?? '') === 'TA') $scoreA += 20;
                    if (strtoupper($b['original_language'] ?? '') === 'TA') $scoreB += 20;
                    if (strtoupper($a['original_language'] ?? '') === 'TE') $scoreA += 15;
                    if (strtoupper($b['original_language'] ?? '') === 'TE') $scoreB += 15;
                    return $scoreB <=> $scoreA;
                });
            }

            // If user mentioned Tamil, Telugu, Hindi, prioritize matching languages
            $isTamilSearch = preg_match('/\btamil\b/i', $rawQuery);
            $isTeluguSearch = preg_match('/\btelugu\b/i', $rawQuery);
            $isHindiSearch = preg_match('/\bhindi\b/i', $rawQuery);

            if ($isTamilSearch || $isTeluguSearch || $isHindiSearch) {
                usort($results, function($a, $b) use ($isTamilSearch, $isTeluguSearch, $isHindiSearch) {
                    $scoreA = 0; $scoreB = 0;
                    if ($isTamilSearch && strtoupper($a['original_language'] ?? '') === 'TA') $scoreA += 10;
                    if ($isTamilSearch && strtoupper($b['original_language'] ?? '') === 'TA') $scoreB += 10;
                    if ($isTeluguSearch && strtoupper($a['original_language'] ?? '') === 'TE') $scoreA += 10;
                    if ($isTeluguSearch && strtoupper($b['original_language'] ?? '') === 'TE') $scoreB += 10;
                    if ($isHindiSearch && strtoupper($a['original_language'] ?? '') === 'HI') $scoreA += 10;
                    if ($isHindiSearch && strtoupper($b['original_language'] ?? '') === 'HI') $scoreB += 10;
                    return $scoreB <=> $scoreA;
                });
            }

            // Search local worldwide movies
            $q = strtolower($searchTerm);
            $localFound = array_values(array_filter($worldwide, function($m) use ($q) {
                return strpos(strtolower($m['title']), $q) !== false || strpos(strtolower($m['genre']), $q) !== false;
            }));

            // Avoid duplicate IDs when merging
            $existingIds = array_column($results, 'id');
            $uniqueLocal = array_filter($localFound, function($m) use ($existingIds) {
                return !in_array($m['id'], $existingIds);
            });

            echo json_encode(array_merge($results, array_values($uniqueLocal)));
        } else {
            echo json_encode($worldwide);
        }
    } elseif ($action === 'trailers') {
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $trailers = [];
            $res = fetchFromTMDB('/movie/' . $id . '/videos');
            if ($res && isset($res['results']) && count($res['results']) > 0) {
                $filtered = array_filter($res['results'], function($v) {
                    return strtolower($v['site']) === 'youtube' && (strtolower($v['type']) === 'trailer' || strtolower($v['type']) === 'teaser');
                });
                $trailers = array_values($filtered);
            }
            
            // Guaranteed high-definition trailer video key fallback if TMDB returns empty
            if (count($trailers) === 0) {
                $fallbackMap = [
                    '949429' => 'Po3jIGJJzA0', // Leo
                    '934632' => 'xenOE1Tma0A', // Jailer
                    '868759' => 'vqu4z34wENw', // Pathaan
                    '872906' => 'COv52Qyctws', // Jawan
                    '579974' => 'f_vbAtFSEc0', // RRR
                    '360814' => 'x_7YlGv9u1g', // Dangal
                    '20453'  => 'K0eDlFX9GMc', // 3 Idiots
                    '725201' => 'OKBMCL-frPU', // Vikram
                    '350312' => 'qD-6d8Wo3do', // Baahubali 2
                    '693134' => 'pKctlefObjE', // Pushpa
                    '601796' => 'JKa05nyUmuQ', // KGF 2
                    '155'    => 'EXeTwQWrcwY', // The Dark Knight
                    '557'    => 'TYMMOjBUP60', // Spider-Man
                    '27205'  => 'YoHD9XEInc0', // Inception
                    '157336' => 'zSWdZVtXT7E'  // Interstellar
                ];
                $key = isset($fallbackMap[(string)$id]) ? $fallbackMap[(string)$id] : null;
                if ($key) {
                    $trailers = [
                        ["key" => $key, "site" => "YouTube", "type" => "Trailer", "name" => "Official HD Trailer"]
                    ];
                }
            }
            echo json_encode($trailers);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Movie ID required."]);
        }
    } elseif ($action === 'detail') {
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $res = fetchFromTMDB('/movie/' . $id);
            if ($res && !isset($res['status_code'])) {
                $mapped = mapTmdbMovie($res);
                if (isset($res['genres']) && is_array($res['genres']) && count($res['genres']) > 0) {
                    $mapped['genre'] = implode(', ', array_column($res['genres'], 'name'));
                }
                $credits = fetchFromTMDB('/movie/' . $id . '/credits');
                if ($credits && isset($credits['cast'])) {
                    $mapped['cast'] = array_map(function($c) {
                        return [
                            'id' => $c['id'],
                            'name' => $c['name'],
                            'profile_url' => isset($c['profile_path']) && $c['profile_path'] ? 'https://image.tmdb.org/t/p/w200' . $c['profile_path'] : 'https://via.placeholder.com/200x300?text=No+Image'
                        ];
                    }, array_slice($credits['cast'], 0, 6));
                }
                if ($credits && isset($credits['crew'])) {
                    foreach ($credits['crew'] as $crew) {
                        if ($crew['job'] === 'Director') {
                            $mapped['director'] = $crew['name'];
                            break;
                        }
                    }
                }
                echo json_encode($mapped);
            } else {
                // Search in worldwide
                $found = null;
                foreach($worldwide as $w) {
                    if ((string)$w['id'] === (string)$id) {
                        $found = $w;
                        break;
                    }
                }
                echo json_encode($found ? $found : $worldwide[0]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete request."]);
        }
    } elseif ($action === 'actor') {
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $person = null;
            if (is_numeric($id)) {
                $person = fetchFromTMDB('/person/' . $id);
            }
            // If direct ID failed or non-numeric name was passed, search by name
            if (!$person || isset($person['status_code'])) {
                $searchRes = fetchFromTMDB('/search/person?query=' . urlencode($id));
                if ($searchRes && isset($searchRes['results']) && count($searchRes['results']) > 0) {
                    $personId = $searchRes['results'][0]['id'];
                    $person = fetchFromTMDB('/person/' . $personId);
                }
            }
            
            if ($person && !isset($person['status_code'])) {
                $credits = fetchFromTMDB('/person/' . $person['id'] . '/movie_credits');
                $movies = [];
                if ($credits && isset($credits['cast'])) {
                    // Sort by popularity and take top 8
                    usort($credits['cast'], function($a, $b) {
                        return ($b['popularity'] ?? 0) <=> ($a['popularity'] ?? 0);
                    });
                    $movies = array_map('mapTmdbMovie', array_slice($credits['cast'], 0, 8));
                }
                
                echo json_encode([
                    "id" => $person['id'],
                    "name" => $person['name'],
                    "biography" => !empty($person['biography']) ? $person['biography'] : 'No biography available for this actor.',
                    "profile_url" => isset($person['profile_path']) && $person['profile_path'] ? 'https://image.tmdb.org/t/p/w500' . $person['profile_path'] : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
                    "known_for_department" => $person['known_for_department'] ?? 'Acting',
                    "movies" => $movies
                ]);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Actor not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Actor ID or name required."]);
        }

    } elseif ($action === 'download') {
        $url = isset($_GET['url']) ? $_GET['url'] : '';
        if (!empty($url)) {
            header("Location: " . $url, true, 302);
            exit;
        } else {
            http_response_code(400);
            echo json_encode(["message" => "URL required."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Action not found."]);
    }
}
?>
