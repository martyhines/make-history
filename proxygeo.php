<?php
header('Content-type: application/javascript; charset: utf-8');
$lat = $_POST["lat"];
$long = $_POST["long"];
$url = "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?latitude=".$lat."&logitude=".$long."&api-key=cce7ce94779bcd5257c28c87bf971d41:16:66427984";
echo file_get_contents($url);
?>