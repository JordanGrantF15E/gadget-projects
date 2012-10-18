<?php
error_reporting(E_ALL);
echo 'kjhi';
$str = "<?xml version=\"1.0\" encooding=\"UTF-8\">";
// $url = “http://www.jepptech.com/tfr/Query.asp?UserID=Public”;
//   $url = "http://www.jepptech.com/tfr/Query.asp?UserID=Public&ID=1520";
  $url = "http://localhost/AllTFRs.xml";
  $str2 = file_get_contents($url);

 if ($result === false) 
 { echo "error"; }
 else
 { echo str2$; }
 
?>