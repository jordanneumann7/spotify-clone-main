<?php
include('pdo_connect.php');
//header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');

// Get search input from query parameters
$search = isset($_GET['search']) ? $_GET['search'] : 'test';
$filter = isset($_GET['filter']) ? $_GET['filter'] : 'song';
echo"<h1>$search</h1>";
//Placeholder Query
$sql = "";
/*
switch ($filter) {
    case 'artist':
        $sql = "SELECT track_artist FROM artist WHERE track_artist_name LIKE :search";
        break;
    case 'song':
        $sql = "SELECT track_name, track_artist FROM song WHERE track_name LIKE :search";
        break;
    case 'albums':
        $sql = "SELECT track_album_name, track_artist FROM albums WHERE track_album_name LIKE :search";
        break;
    case 'genre':
        $sql = "SELECT track_name, track_artist FROM playlists WHERE playlist_genre LIKE :search OR playlist_subgenre LIKE :search";
        break;
    default:
        $sql = "SELECT track_name, track_artist FROM song WHERE track_name LIKE :search";
}
*/
$parametervalues = array(':search' => '%' . $search . '%');

$results = fetchResults($db, $sql, $parametervalues);
echo json_encode($results);


function fetchResults($db, $sql, $parametervalues = null)
{
    //prepare statement class
    $stm = $db->prepare($sql);

    // Execute the ststement with named parameters
    $stm->execute($parametervalues);

    // Fetch the result set
    $list = $stm->fetchAll(PDO::FETCH_ASSOC);

    // Return the result set
    return $list;
}




?>


