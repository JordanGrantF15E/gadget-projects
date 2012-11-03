<?php

//$mysqlserver = 'localhost';
//$mysqluser = 'rvx33227_main';
//$mysqlpw = 'main123';
//$mysqldb = 'rvx33227_step';

//$mysqlserver = 'localhost';
//$mysqluser = 'maptools';
//$mysqlpw = 'maptools';
//$mysqldb = 'maptools';

require_once('FirePHPCore/FirePHP.class.php');
ob_start();

$firephp = FirePHP::getInstance(true);
 
$firephp->registerErrorHandler(
            $throwErrorExceptions=false);
$firephp->registerExceptionHandler();
$firephp->registerAssertionHandler(
            $convertAssertionErrorsToExceptions=true,
            $throwAssertionExceptions=false);
 
try {
  throw new Exception('Test Exception');
} catch(Exception $e) {
  $firephp->error($e);  // or FB::
}




require("maptool_db_settings.php");

$dbtable = 'featureskml';

if(isset($_POST['action'])) {
	$action = $_POST['action'];

	if(isset($_POST['layer_name'])) {
		$layer_name=$_POST['layer_name'];

		$layer_kml=$_POST['layer_kml'];

		if($action=='savekml') {

			/* connect to the db */
			$link = mysql_connect($mysqlserver,$mysqluser,$mysqlpw) or die('Cannot connect to the DB');
			mysql_select_db($mysqldb,$link) or die('Cannot select the DB');

			$sql = "SELECT `layername` FROM `$dbtable` WHERE `layername` = '$layer_name'";
			$result = mysql_query($sql,$link) or die('Errant query:  '.$sql);	
			
			if(mysql_num_rows($result)<1){

				$sql = "INSERT INTO `$mysqldb`.`$dbtable` (`layername`,`kmltext`) "
					." VALUES ('$layer_name', '$layer_kml') ";
			}
			else{
				$sql = "UPDATE `$mysqldb`.`$dbtable` SET `$dbtable`.`kmltext` = '$layer_kml' "	
    				. "WHERE `$dbtable`.`layername` = '$layer_name'";
			}
			$firephp->info($sql);
			$result = mysql_query($sql,$link) or die('Errant query:  '.$sql);	
			$rowsupdated = mysql_affected_rows($link);
			$firephp->info($rowsupdated);

			/* disconnect from the db */
			@mysql_close($link);
		}

	}
	else{
		throw new Exception("no layer name");
	};
};

/* require the user as the parameter */
 if(isset($_GET['layer_name'])) { 
	$layer_name=$_GET['layer_name'];

	/* connect to the db */
	$link = mysql_connect($mysqlserver,$mysqluser,$mysqlpw) or die('Cannot connect to the DB'.'  '.$mysqlserver.$mysqluser.$mysqlpw);
	mysql_select_db($mysqldb,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT kmltext FROM `$dbtable` ";
	$wherephrase = "WHERE layername='$layer_name'";
	
	$result = mysql_query($query,$link) or die('Errant query:  '.$query);
	
	$row = mysql_fetch_assoc($result);
    echo $row['kmltext'];

	
	/* disconnect from the db */
	@mysql_close($link);
}
?>