<?php

include_once ('../class/class.Mailercovidsms.php');

// ini_set('display_errors','on');
// error_reporting(E_ALL);

// get date time for this transaction
$datetime = date("Y-m-d H:i:s");

// set variables
// $from = $_POST['emailfrom'];
// $to = $_POST['emailto'];
// $textmessage = $_POST['textmessage'];
$rv = "";

$from = "daredevilducks.xyz@gmail.com";
$to = "9784734868@messa­gin­g.s­pri­ntp­cs.com";

$textNumber = "tarrant.cutler";
$textCarrier = "gmail.com";
$to = $textNumber . "@" . $textCarrier;

$textmessage = "Hi Tammy this is a test of sending an sms message from a web server.";
//
// create mail object
//
$sms = new Mailercovidsms($from,$to,$textmessage);

// send email
$rv = $sms->sendMail();

// //
// // pass back info
// //
exit($rv);

?>
