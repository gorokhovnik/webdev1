<html> 
    <head>
		<meta charset="UTF-8"/>
        <title>4 lab/admin</title>
    </head>
    
    <body>
        <a href="post.php">Добавить водички</a>
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
        	    ?>
                <form action="" method="POST">
                    <input type="hidden" name="id" value="<?php echo $row['id'] ?>"/>
                    <input type="submit" name="delete" value="дропнуть"/>
                </form>
                <hr>
                <?php
        	}
        
            if (isset($_POST["delete"])) {
                $id = $_POST["id"];
                $delquery = "delete from j911110q_news.news where id=".$id;
                $res = mysql_query($delquery);
            }
        ?>
        <a href="index.php">Простолюдинская лента</a>
    </body>
</html>

