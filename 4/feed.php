<?php
	$server = "localhost"
	$user = "j911110q"
	$pass = "123456"
	$db = "news"
	mysql_connect($server, $user, $pass)
	mysql_select_db($db)
	$query = "select headline, text from news order by id desc"
	$res = mysql_query($query)
	while ($row = mysql_fetch_array($res)) {
		echo "<tr><td bgcolor=#FFFFFF>".$row['headline']</td></tr>";
	}
?>