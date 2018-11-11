<?php
header("Access-Control-Allow-Origin: *");

$area_code = array();
$airports = array();

$push_output = "<ul>";



	include("../../includes/i_cnx.php");

	$jarvis = dbconnect::lets_connect();

	
	$fetch_locations = $jarvis -> query("select * from airports ") or die($jarvis -> error);
	while($fetch_locations_array = $fetch_locations -> fetch_assoc()){

		$the_area_code = $fetch_locations_array['code'];
		$the_airport = $fetch_locations_array['the_airport'];

		array_push($area_code, $the_area_code);
		array_push($airports, $the_airport);

	}


	for ($i = 0; $i < sizeof($area_code); $i++) {
		
		$real_area_code = $area_code[$i];
		$real_airport = $airports[$i];

		$push_output.= "<li class='item-content' onclick=\"pushMyCity2('$real_area_code')\">
          <div class='item-inner'>
            <div class='item-title'>$real_airport</div>
          </div>
        </li>";
	}

	

	echo $push_output.="</ul>";
?>