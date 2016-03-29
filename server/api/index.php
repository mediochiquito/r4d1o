<?php header('Access-Control-Allow-Origin: *');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
include '../init.php';
$app = new \Slim\App;
$app->get('/current_song', function (Request $request, Response $response) {

    $newResponse = $response->withHeader('Content-type', 'text/plain');
    $newResponse->getBody()->write(file_get_contents('http://74.50.111.38/currentsong'));
    return $newResponse;

});

$app->get('/top_songs', function (Request $request, Response $response) {

    $rs = mysql_query('SELECT * FROM top ORDER BY id ASC');
    while($row = mysql_fetch_object($rs)){
        $row->like = true;
        $r[] = $row;
        $r[] = $row;
        $r[] = $row;
        $r[] = $row;
    }
    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r)));
    return $newResponse;

});



$app->post('/regsiter', function (Request $request, Response $response) {
    
      $allPostPutVars = $request->getParsedBody();


/*      foreach($allPostPutVars as $key => $value){

          mysql_query('INSERT INTO `usuario` SET
                    
             usuario_nombre = "' . $key . '"

             WHERE actividades_id = "'.$value.'"');

      }*/

      $newResponse = $response->withHeader('Content-type', 'application/json');
      $newResponse->getBody()->write(json_encode(array('response' =>'ok')));
      return $newResponse;

});
/*
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
*/



$app->run();