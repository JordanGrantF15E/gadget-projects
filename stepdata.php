<?php

//$mysqlserver = 'localhost';
//$mysqluser = 'rvx33227_main';
//$mysqlpw = 'main123';
//$mysqldb = 'rvx33227_step';

//$mysqlserver = 'localhost';
//$mysqluser = 'stepbrief';
//$mysqlpw = 'stepbrief';
//$mysqldb = 'stepdata';

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



require("settings.php");

$dbtable = 'screendata';

if(isset($_POST['section'])) {
	$section=strtolower($_POST["section"]);
	$displaytext=$_POST["displaytext"];
	$divcolumn=$_POST["divcolumn"];
	$divrow=$_POST["divrow"];
	$action=$_POST["action"];

		/* connect to the db */
	$link = mysql_connect($mysqlserver,$mysqluser,$mysqlpw) or die('Cannot connect to the DB');
	mysql_select_db($mysqldb,$link) or die('Cannot select the DB');
	
	if($action=='killsection'){
		
		$sql = "DELETE FROM `screendata` WHERE `screendata`.`unit` = '65AGRS' AND `screendata`.`section` = '$section';";
		$result = mysql_query($sql,$link) or die('Errant query:  '.$sql);
		echo $result;
	};

	if(isset($_POST['newsectionname'])){
		$newsectionname=$_POST['newsectionname'];
		if ($section=='addnew') {
			$sql = "INSERT INTO `$mysqldb`.`screendata` (`unit`,`section`,`divcolumn`,`divrow`) "
			." VALUES ('65AGRS', '$newsectionname', '$divcolumn', '$divrow') ";
		}
		else{
			$sql = "UPDATE `$mysqldb`.`screendata` SET `screendata`.`section` = '$newsectionname' "
    		. "WHERE `screendata`.`unit` = '65AGRS' AND `screendata`.`section` = '$section';";
		};
		$result = mysql_query($sql,$link) or die('Errant query:  '.$sql);		
	}
	elseif (isset($_POST['displaytext'])) {
		$sql = "UPDATE `$mysqldb`.`screendata` SET `displaytext` = '$displaytext', `divcolumn` = '$divcolumn'"
    	. "WHERE `screendata`.`section` = '$section';";
	
		$result = mysql_query($sql,$link) or die('Errant query:  '.$sql);
		echo $result;
	};
};

/* require the user as the parameter */
 if(isset($_GET['section'])) { 

	/* soak in the passed variable or set our own */
	$unit = isset($_GET['unit']) ? strtolower($_GET['unit']) : '65agrs'; //65agrs is the default
	//$format = strtolower($_GET['format']) == 'json' ? 'json' : 'json'; //json is the default
	$format = 'json';
	$section = strtolower($_GET['section']); //no default

	/* connect to the db */
	$link = mysql_connect($mysqlserver,$mysqluser,$mysqlpw) or die('Cannot connect to the DB'.'  '.$mysqlserver.$mysqluser.$mysqlpw);
	mysql_select_db($mysqldb,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT section, displaytext FROM `screendata` ";
	$wherephrase = "WHERE unit='$unit'";
	
	if  ( $section != '%') {
		$wherephrase .= "AND section='$section'";
	}
	$query .= $wherephrase;
//	echo $query;
	$result = mysql_query($query,$link) or die('Errant query:  '.$query);
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
	    $rows[] = $r;
	}
	echo json_encode($rows);


	
	/* disconnect from the db */
	@mysql_close($link);
}
?>