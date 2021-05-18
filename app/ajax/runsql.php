<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$sql = "";

if( isset($_POST['sql']) )
{
     $sql = $_POST['sql'];
}

if( isset($_GET['sql']) )
{
     $sql = $_GET['sql'];
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// set variables
$enterdate = $datetime;

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
if ($sql != "")
{
	$modulecontent = "Unable to connect for sql run = $sql";
}
include ('mysqlconnect.php');

//---------------------------------------------------------------
// run the sql
//---------------------------------------------------------------

//
// sql query
//
$function = "select";
include ('mysqlquery.php');

if ($errtext == '')
{
	//
	// get the sql results
	//
	$sqlresults = array();
	$recordcount = '';
	while($r = mysqli_fetch_assoc($sql_result)) {
	    $sqlresults[] = $r;
	    $recordcount += 1;
	}

	$returnArray = array();
	$returnArray[0] = $sqlresults;
	$returnArray[1] = "Record Count: " . $recordcount;
}
else
{
	//
	// get the sql results
	//
	$sqlresults = $errtext;
	$recordcount = 'SQL Error';
	
	$returnArray[0] = $sqlresults;
	$returnArray[1] = $recordcount;
}
	
//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($returnArray));

?>
