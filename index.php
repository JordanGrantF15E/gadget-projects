<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>Step Brief</title>
</head>
<body onload=updateScreenData()>
<style>
	#sortable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
	#sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; }
	#sortable li span { position: absolute; margin-left: -1.3em;  }
	textarea {float: right; width: 90%;  background: transparent; color: white; font-weight: bold; border:none}
	textarea  {line-height: 20px; opacity: inherit; height: 28px; } 
	
	#clock {font-size: 0.75em;}
	.header {padding-top: 0.5em; background: #575973;  color: #ffff00; text-align: center; font-size: 2em;}

	body { margin: 0}
	html { 
	background: url(images/blue_gradient_background.jpg) no-repeat center center fixed; 
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
		}
</style>
<?php
require_once('FirePHPCore/FirePHP.class.php');
ob_start();
?>

<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.23.custom.css" rel="Stylesheet" />	
<link type="text/css" href="css/step.css" rel="Stylesheet" />
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.23.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.autosize.js"></script>
<script type="text/javascript" src="settings.js"></script>
<script type="text/javascript" src="js/jquery.jplayer.min.js"></script>
<style>
	.column { width: 33%; float: left; padding-bottom: 100px; }
	.portlet { margin: 0px 1px 1px 0px; background: transparent; border-color: #010229}
	.portlet-header { margin: 0.3em 0em 0.1em 0em; padding-left: 0em; border:none; background: none; font-weight: bold; color: white; text-decoration: underline; text }
	.header-input { margin: 0.3em 0em 0.1em 0em; padding-left: 0em; border:none; background: none; font-weight: bold; color: white; text-decoration: underline; text }
	.ui-icon-minusthick { float: right; }
	.ui-icon-plusthick { float: right; }
	.ui-icon-closethick {float: left; }
	.portlet-content { padding: 0.1em 0.4em 0.4em 0em;  }
	.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; }
	.ui-sortable-placeholder * { visibility: hidden; }
	.subdued {filter:alpha(opacity: 0); opacity: 0;}

	.stepmusic {clear: both;}	
</style>


<script>

$(document).ready(function(){
    
    $( 'textarea' ).autosize();  
    
    $( ".addnew" ).mouseover(function() {
    	$(this).removeClass('subdued');
    });

    $( ".addnew" ).mouseout(function() {
    	$(this).addClass('subdued');
    });


	//$phpserver = "http://www.rv-x.net/";
	//$phpserver = "http://localhost/";
	
	$(function() {
		$( ".column" ).sortable({
			connectWith: ".column"
		});

		$( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
			.find( ".portlet-header" )
				.addClass( "ui-widget-header ui-corner-all" )
				.prepend( "<span class='ui-icon ui-icon-closethick subdued'></span><span class='ui-icon ui-icon-minusthick'></span>")
				.end()
			.find( ".portlet-content" );

		$( ".ui-icon-plusthick, .ui-icon-minusthick" ).click(function() {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		});

		$( ".ui-icon-closethick" ).mouseover(function(){
			$( this ).removeClass('subdued');
		});

		$( ".ui-icon-closethick" ).mouseout(function(){
			$( this ).addClass('subdued');
		});
		
		$( ".ui-icon-closethick" ).click(function(){
			killsection(this);
		});
		//$( ".column" ).disableSelection();
	});

	$("#jpId").jPlayer( {
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3: "mp3/661.mp3" // Defines the mp3 url
			});
		}
	});

	$(function() {
        $( "#startmusic" )
            .button()
            .click(function( event ) {
                event.preventDefault();
                $("#jpId").jPlayer("play");
            });
        $( "#stopmusic" )
            .button()
            .click(function( event ) {
                event.preventDefault();
                $("#jpId").jPlayer("stop");
            });            
    });
});
</script>

<script type="text/javascript">

function killsection(closebuttonelement)
{
	$url = $phpserver + "stepdata.php";
	$sectionname = $(closebuttonelement).parents('.portlet').attr('id');
	r = confirm("Delete the section titled "+ $sectionname + "?");
	if (r==true)
	  {
		$.post($url, { unit: "65AGRS", section: $sectionname, action: 'killsection'} , function(data) {});
		$(closebuttonelement).parents('.portlet').remove();
	  }
	else
	  {
	  } 


}

function savechange(tarea)
{
	$url = $phpserver + "stepdata.php";

	if (tarea.classList[0]=="header-input") {
		$sectionname = $(tarea).parents('.portlet').attr('id');
		if ($sectionname!="addnew") {	
			$.post($url, { unit: "65AGRS", section: $sectionname, newsectionname: tarea.value} , function(data) {});
			$(tarea).parents('.portlet').attr('id',tarea.value);	
		}
		else {
			divcol = $(tarea).parents('.column');
			$divcol = $('.column').index(divcol);
			$divrow = divcol.children('.portlet').index($(tarea));	
			$.post($url, { unit: "65AGRS", section: $sectionname, newsectionname: tarea.value, divcolumn: $divcol, divrow: $divrow } , function(data) {
 			});
		};
	}
	else {

	//finds column using jquery parents function - looks up the DOM tree until it finds a div named 'column', then returns index of that div
	$sectionname = tarea.id;
	divcol = $(tarea).parents('.column');
	$divcol = $('.column').index(divcol);

	$divrow = divcol.children('.portlet').size();
	parentportlet = $(tarea).parents('.portlet');
	$divrow = divcol.children('.portlet').index(parentportlet);

	//$displaytext = document.getElementById(section.id).value;
	$.post($url, { unit: "65AGRS", section: tarea.id, displaytext: tarea.value, divcolumn: $divcol, divrow: $divrow } , function(data) {
 		});
	};
}

function updateScreenData(){
	updateClock();
	updateBoxes();
}

function updateBoxes(){
   $url = $phpserver + "stepdata.php";
   $.getJSON($url+"?section=%",  function(json) {
   		
   		$.each(json, function(key, val) {
   			$section=json[key].section;
   			$newdisplaytext = json[key].displaytext;
   			if ($section!="") {
	    		$("textarea#"+$section).val($newdisplaytext);
	    	};
	    //	alert($('textarea#jets').size());
	    });
	       $('textarea').trigger('autosize');
   })

//		$section=json.section;
  // 		document.getElementById(json[0].section).value=json[0].displaytext;
   	//	   $('textarea').trigger('autosize');
   	//	})

}

function updateClock(){
  var currentTime = new Date ( );

  var theMonths= new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

  var currentYear = currentTime.getFullYear();
  var currentDate = currentTime.getDate();
  var currentMonth = theMonths[currentTime.getMonth()];
  var currentDate = currentTime.getDate();
  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
  currentTimeString = currentDate + " " + currentMonth + " " + currentYear;

  // Update the time display
  document.getElementById("clock").firstChild.nodeValue = currentTimeString;
  
  

  
}

// -->
</script>

<div class="demo">
<div class="header">
FLANKER Step Brief<br>
<span id="clock">clock</span>
</div>

<?php
	//$mysqlserver = 'localhost';
	//$mysqluser = 'rvx33227_main';
	//$mysqlpw = 'main123';
	//$mysqldb = 'rvx33227_step';
	
	//$mysqlserver = 'localhost';
	//$mysqluser = 'stepbrief';
	//$mysqlpw = 'stepbrief';
	//$mysqldb = 'stepdata';
	
	require("settings.php");
	$dbtable = 'screendata';
	$unit = '65AGRS';

	$link = mysql_connect($mysqlserver,$mysqluser,$mysqlpw) or die('Cannot connect to the DB');
	mysql_select_db($mysqldb,$link) or die('Cannot select the DB');
	
	$sql = "SELECT `screendata`.`divcolumn`, `screendata`.`divrow`, `screendata`.`unit`, `screendata`.`section`, `screendata`.`displaytext`"
        . " FROM screendata"
        . " WHERE `screendata`.`unit` = '$unit'"
        . " ORDER BY `screendata`.`divcolumn` ASC, `screendata`.`divrow` ASC"; 	
	
	$result = mysql_query($sql,$link) or die('Errant query:  '.$sql);
	$numports = mysql_num_rows($result);

	//start first column
	$icol = 0;
	echo("<div class='column'>");	
	
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	
		//if current column in $row is greater than $icol, need to end old col, add new col until they are equal
		while (($row["divcolumn"]>$icol) and ($icol<2)) {
    		//Write a subdued portlet as placeholder for adding a new section
			echo("	
				<div class='portlet addnew subdued' id='addnew'>
					<div class='portlet-header'><input type='text' class='header-input' value='new section' onchange=\"savechange(this)\"'></input></div>
					<div class='portlet-content'></div>
				</div>
				");

    		echo("</div>");
    		$icol++;
    		echo("<div class='column'>");			
		}

		echo("	
			<div class='portlet' id='".$row["section"]."'>
				<div class='portlet-header'><input type='text' class='header-input' value='".$row["section"]."' onchange=\"savechange(this)\"'></input></div>
				<div class='portlet-content'>
					<textarea class='textcontent' id='".$row["section"]."' onchange=\"savechange(this)\">
					</textarea></div>
			</div>
			");  //".$row["section"]."
			        	
    }

    while ($icol<3){

		//Write a subdued portlet as placeholder for adding a new section
		echo("	
			<div class='portlet addnew subdued' id='addnew'>
				<div class='portlet-header'><input type='text' class='header-input' value='new section' onchange=\"savechange(this)\"'></input></div>
				<div class='portlet-content'></div>
			</div>
			");

		echo("</div>");
	    echo("\n</div>\n<div class='column'>");
	    $icol = $icol+1;
    }
    
	//Write a subdued portlet as placeholder for adding a new section
	echo("	
		<div class='portlet addnew subdued' id='addnew'>
			<div class='portlet-header'><input type='text' class='header-input' value='new section' onchange=\"savechange(this)\"'></input></div>
			<div class='portlet-content'></div>
		</div>
		");

	echo("</div>");

?>
<div class="stepmusic">
 <div id="jpId" ></div>
<a href="#" id="startmusic">Start Glorious Step Music</a>
<a href="#" id="stopmusic">Stop Glorious Step Music</a>
</div>
</body>
</html>