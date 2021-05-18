<?php 
$errtext = '';
$sql_result = @mysqli_query($dbConn, $sql);
if (!$sql_result)
{
	// $log = new ErrorLog("logs/");
	// $sqlerr = mysqli_error($dbConn);
	// $log->writeLog("SQL error: $sqlerr - Error function: $function msg: $modulecontent");
	// $log->writeLog("SQL: $sql");

	$sqlerr = mysqli_error($dbConn);
	$errtext = "System Error: $sqlerr. sql = $sql";
}

?>