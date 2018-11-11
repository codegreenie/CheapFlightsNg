<?php
class dbconnect{
	
		private static $hostname;
		private static $username;
		private static $passcode;
		private static $db_2_connect_2;
			
	
	public function __construct($con_hostname = "myHost", $con_username = "i_am_a_user", $con_passcode = "crypted_code",$con_db_name = "our_database"){
        
        $this -> hostname = $con_hostname;
        $this -> username = $con_username;
        $this -> passcode = $con_passcode;
        $this -> db_2_connect_2 = $con_db_name;
        
    }
	
    
    private static function set_db_params(){
		
			self::$hostname = "localhost";
			self::$username = "root";
			self::$passcode = "animalistic0407";
			self::$db_2_connect_2 = "quickbooking";
	}
	
	public static function lets_connect(){
	
		self::set_db_params();
		$ini_mysql = new mysqli(self::$hostname, self::$username, self::$passcode,self::$db_2_connect_2);
		 
		
		
		if($ini_mysql -> connect_errno > 0){
			
			die("Cannot connect to database, please try again later :(");
		}
		
		
		return $ini_mysql;
		
	}
				
				
		
}	
?>