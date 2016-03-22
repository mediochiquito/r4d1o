<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

include '../init.php';

$app = new \Slim\App;
$app->get('/actividades/', function (Request $request, Response $response) {
    

   	$rs = mysql_query('SELECT * FROM actividades WHERE actividades_eliminado=0 ORDER BY actividades_orden ASC,  actividades_id DESC');
    
   	while($row = mysql_fetch_object($rs)){
      $row->actividades_imagenes_galeria = json_decode($row->actividades_imagenes_galeria);
   		$r[] = $row;
   	}
    

    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r)));
    return $newResponse;

});



$app->post('/ordenActividades', function (Request $request, Response $response) {
    
      $allPostPutVars = $request->getParsedBody();

      foreach($allPostPutVars as $key => $value){

          mysql_query('UPDATE `actividades` SET  
                    
             actividades_orden = "' . $key . '" 

             WHERE actividades_id = "'.$value.'"');

      }

      $newResponse = $response->withHeader('Content-type', 'application/json');
      $newResponse->getBody()->write(json_encode(array('response' =>'ok')));
      return $newResponse;  


});



$app->post('/actividades/upload_pic', function (Request $request, Response $response) {
    
  

    ini_set('memory_limit', '100M');
    ini_set('post_max_size', '10M');
    ini_set('upload_max_filesize', '10M');
    ini_set('max_execution_time', 300);
    set_time_limit(0);

     $newResponse = $response->withHeader('Content-type', 'application/json');

    if($_FILES["file"]["name"] != ''){

      $hash_file = md5(date('Ymdhis').$_SERVER['REMOTE_ADDR'].rand(0,9999999999));
      $name = $_FILES["file"]["name"];    

      $arra_ext_name = explode('.', $name);

      $extension = end( $arra_ext_name);  
      $destino = dirname(dirname(__FILE__)) . "/uploads/$hash_file.$extension";
      $type = $_FILES['file']['type'];
      
      
      if(move_uploaded_file($_FILES['file']['tmp_name'], $destino)){
          $newResponse->getBody()->write(json_encode(array('filename' => "$hash_file.$extension")));
      }else{
         $newResponse->getBody()->write(json_encode(array('error' => 'error')));
      }

    }



    return $newResponse;

});



$app->get('/actividades/{id}', function (Request $request, Response $response) {
 	  


    $id = $request->getAttribute('id');

  	$rs = mysql_query('SELECT * FROM actividades WHERE actividades_id= ' . mysql_real_escape_string($id) . '  ORDER BY actividades_fecha_hora DESC');
   	$row = mysql_fetch_object($rs);
    $row->actividades_imagenes_galeria = json_decode($row->actividades_imagenes_galeria);
    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $row)));
    return $newResponse;


});


$app->post('/actividades/', function (Request $request, Response $response) {
    
    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;  

    $allPostPutVars = $request->getParsedBody();

  	if(mysql_query('INSERT INTO `actividades` (
							   		
							   		`actividades_titulo`, 
                    `actividades_desc`, 
							   		`actividades_link`, 
							   		`actividades_yt`, 
							   		`actividades_imagen_thumb`, 
							   		`actividades_imagenes_galeria`, 
							   		`actividades_activo`) 	VALUES

					(
					"'.mysql_real_escape_string($allPostPutVars['actividades_titulo']).'", 
          "'.mysql_real_escape_string($allPostPutVars['actividades_desc']).'", 
					"'.mysql_real_escape_string($allPostPutVars['actividades_link']).'", 
					"'.mysql_real_escape_string($allPostPutVars['actividades_yt']).'", 
					"'.mysql_real_escape_string($allPostPutVars['actividades_imagen_thumb']).'", 
					"'.mysql_real_escape_string(json_encode($allPostPutVars['actividades_imagenes_galeria'])).'",
					"'.mysql_real_escape_string($allPostPutVars['actividades_activo']).'")')){
  		

      $newResponse = $response->withHeader('Content-type', 'application/json');
  		$newResponse->getBody()->write(json_encode(array('response' => mysql_insert_id())));
    	return $newResponse;	

  	}else{

  		$response->getBody()->write(json_encode(array('error' => 'Ha ocurrido un error')));
    	return $response;	
  		
  	}

});

$app->put('/actividades/{id}', function (Request $request, Response $response) {
  
  if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;  

  $id = $request->getAttribute('id');
   
	$allPostPutVars = $request->getParsedBody();
 
  	if(mysql_query('UPDATE `actividades` SET 
							   		
					actividades_titulo = "'.mysql_real_escape_string($allPostPutVars['actividades_titulo']).'", 
          actividades_desc = "'.mysql_real_escape_string($allPostPutVars['actividades_desc']).'", 
					actividades_link = "'.mysql_real_escape_string($allPostPutVars['actividades_link']).'", 
					actividades_yt = "'.mysql_real_escape_string($allPostPutVars['actividades_yt']).'", 
					actividades_imagen_thumb = "'.mysql_real_escape_string($allPostPutVars['actividades_imagen_thumb']).'", 
					actividades_imagenes_galeria = "'.mysql_real_escape_string(json_encode($allPostPutVars['actividades_imagenes_galeria'])).'",
					actividades_activo = "'.mysql_real_escape_string($allPostPutVars['actividades_activo']).'" 

					WHERE actividades_id = "'.mysql_real_escape_string($id ).'" 
		
					')){

  		 $newResponse = $response->withHeader('Content-type', 'application/json');  
  		$newResponse->getBody()->write(json_encode(array('response' => $id)));
    	return $newResponse;	

  	}else{
         $newResponse = $response->withHeader('Content-type', 'application/json');  
  		$newResponse->getBody()->write(json_encode(array('error' => 'Ha ocurrido un error')));
    	return $newResponse;	
  		
  	}

   return $response;


});

$app->delete('/actividades/{id}', function (Request $request, Response $response) {
    
  if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;  
    
  $id = $request->getAttribute('id');
   
  $newResponse = $response->withHeader('Content-type', 'application/json');  

    if(mysql_query('UPDATE `actividades` SET   actividades_eliminado = 1

          WHERE actividades_id = "'.mysql_real_escape_string($id ).'" 
    
          ')){

       
       $newResponse->getBody()->write(json_encode(array('response' => $id)));
     
    }else{
        
      $newResponse->getBody()->write(json_encode(array('error' => 'Ha ocurrido un error')));
   
      
    }

   return $newResponse;



});




$app->run();