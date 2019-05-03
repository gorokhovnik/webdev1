<?php
	class db {
		private $host = 'localhost';
		private $user = 'j911110q';
		private $pass = '';
		private $name = 'news';

		public function connect() {
			$Connection = new PDO("mysql:host=$this->host;dbname=$this->name", $this->user, $this->pass);
			$Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $Connection;
		}
	}