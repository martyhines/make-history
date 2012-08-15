<?php
header('Content-type: application/javascript; charset: utf-8');
$url = "http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-section/1.json?api-key=1b0bdb3eaa5806a5a1f4d10a50eed28d:6:66427984";
echo file_get_contents($url);
?>