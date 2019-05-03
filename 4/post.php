<html> 
    <head>
		<meta charset="UTF-8"/>
        <title>4 lab/post</title>
    </head>
    
    <body>
        <form action="" method="POST">
            <p>Заголовок</p>
            <input type="text" name="addHeadline"/>
            <p>Текст</p>
            <textarea name="addText" cols="60" rows="6"></textarea>
            <input type="submit" name="add" value="черкнуть"/>
        </form>
        <?php
            if (isset($_POST["add"])) {
                $text = $_POST["addText"];
                $headline = $_POST["addHeadline"];
            	$server = "localhost";
            	$user = "j911110q_news";
            	$pass = "123456";
            	$db = "news";
            	$link = mysql_connect($server, $user, $pass) or die("Connection error");
            	mysql_select_db($db);
            	$query = "insert into j911110q_news.news(`text`, `headline`) VALUES ('".$text."','".$headline."')";
            	$res = mysql_query($query);
            }
        ?>
        <a href="admin.php">Страничка локального божка</a>
    </body>
</html>