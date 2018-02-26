<?php

{
  $dt=date("d F Y, H:i:s"); // дата и время
  $mail="alfastroy-777@yandex.ru"; // e-mail куда уйдет письмо
  $mail2="288776@mail.ru"; // e-mail куда уйдет письмо
  $title="Заявка на расчет с сайта ".$_SERVER["SERVER_NAME"]; // заголовок(тема) письма
 $name=$_POST["name"];
  $name=htmlspecialchars($name); // обрабатываем
 $phone=$_POST["phone"];
 $step1=$_POST["step1"];
 $step2=$_POST["step2"];
 $step3=$_POST["step3"];
 $step4=$_POST["step4"];
 $step5=$_POST["step5"];
  
 
  $mess="Телефон: $phone<br>";
  $mess.="$step1<br>";
  $mess.="$step2<br>";
  $mess.="$step3<br>";
  $mess.="$step4<br>";
  $mess.="$step5<br>";
  $mess.="<b>Дата и Время:</b> $dt";

  $headers="MIME-Version: 1.0\r\n";
  $headers.="Content-type: text/html; charset=utf-8\r\n"; //кодировка
  $headers.="From: feedback@".$_SERVER["SERVER_NAME"]; // откуда письмо (необязательнакя строка)
  mail($mail, $title, $mess, $headers); // отправляем
  mail($mail2, $title, $mess, $headers); // отправляем2

  // выводим уведомление и перезагружаем страничку
print"
<script language='Javascript' type='text/javascript'>
<!--

function reload()
{location = \"/thanks.html\"}; 
setTimeout('reload()',0);
-->
</script>";
}
?>

