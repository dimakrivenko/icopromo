<?php

	include "class.phpmailer.php";

	$subject = "Message from ICOpromo.com";
	$send_email = "zip557@yandex.ru";

	($_POST['name']) ? $name = "<p><b>Name : </b>".$_POST['name']."</p>" : $name = "";
	($_POST['email']) ? $email = "<p><b>E-mail : </b>".$_POST['email']."</p>" : $email = "";
	($_POST['message']) ? $message = "<p><b>Message : </b>".$_POST['message']."</p>" : $message = "";

	$message_body = "<h2>".$subject."</h2>".$name.$email.$message;

	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$mail->From = $_POST['email'];
	$mail->FromName = $_POST['name'];
	$mail->AddAddress($send_email);
	$mail->IsHTML(true);
	$mail->Subject = $subject;

	$mail->Body = $message_body;
	$mail->Send();
?>
