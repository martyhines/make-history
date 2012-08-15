<?php
header('Content-type: text/html; charset: utf-8');
$weather = $_GET["weather"];

switch ($weather) {
    case (stripos($weather, "scattered") !== FALSE):
        $weather = "Scattered";
        break;
    case (stripos($weather, "cloud") !== FALSE):
        $weather = "Cloud";
        break;
    case (stripos($weather, "storm") !== FALSE):
        $weather = "Storm";
        break;
    case (stripos($weather, "shower") !== FALSE):
        $weather = "Shower";
        break;
    case (stripos($weather, "sun") !== FALSE):
        $weather = "Sun";
        break;
    case (stripos($weather, "fog") !== FALSE):
        $weather = "Mist";
        break;        
}

$url = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&q=".$weather;
print file_get_contents($url);
?>