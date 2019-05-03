<html> 
    <head>
		<meta charset="UTF-8"/>
        <title>4 lab</title>
    </head>
    
    <body>
        <?php
        	$server = "localhost";
        	$user = "j911110q_news";
        	$pass = "123456";
        	$db = "news";
        	$link = mysql_connect($server, $user, $pass) or die("Connection error");
        	mysql_select_db($db);
        	$query = "select id, headline, text from j911110q_news.news order by id desc";
        	$res = mysql_query($query);
        	while ($row = mysql_fetch_array($res)) {
        	    echo "<h1>".$row['headline']."</h1>";
        	    echo "<p>".$row['text']."</p>";
        	    echo "<hr>";
        	}
        ?>
        <a href="admin.php">Страничка локального божка</a>
    </body>
</html>