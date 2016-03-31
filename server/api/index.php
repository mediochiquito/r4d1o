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

    $rs_me = mysql_query('SELECT id FROM usuarios WHERE MD5(CONCAT("vespa", id)) = "' . mysql_real_escape_string($_GET['accessToken']) . '" LIMIT 1');
    $row_me = mysql_fetch_object($rs_me);

    $rs_mis_votos =  mysql_query('SELECT * FROM votos WHERE usuario_id = "' . mysql_real_escape_string($row_me->id) . '"');
    $array_mis_voto = array();
    while($row_mis_votos = mysql_fetch_object($rs_mis_votos)){
        $array_mis_voto[] = $row_mis_votos->top_id;
    }

    $rs = mysql_query('SELECT * FROM top ORDER BY id ASC');
    while ($row = mysql_fetch_object($rs)) {
        $row->like = in_array($row->id, $array_mis_voto);
        $r[] = $row;
        $r[] = $row;
        $r[] = $row;
        $r[] = $row;
    }
    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r)));
    return $newResponse;

});





$app->post('/register', function (Request $request, Response $response) {

    $allPostPutVars = $request->getParsedBody();

    if (mysql_query('INSERT INTO `usuarios` ( `nombre`, `apellido`, `email`, `sexo`, `edad`, `tel`) VALUES (

					"' . mysql_real_escape_string($allPostPutVars['nombre']) . '",
                    "' . mysql_real_escape_string($allPostPutVars['apellido']) . '",
					"' . mysql_real_escape_string($allPostPutVars['email']) . '",
					"' . mysql_real_escape_string($allPostPutVars['sexo']) . '",
					"' . mysql_real_escape_string($allPostPutVars['edad']) . '",
					"' . mysql_real_escape_string($allPostPutVars['tel']) . '"

					)')) {

        $newResponse = $response->withHeader('Content-type', 'application/json');
        $newResponse->getBody()->write(json_encode(array('message' => 'Gracias por registrarte.', 'accessToken' => md5('vespa' . mysql_insert_id()))));
        return $newResponse;

    } else {

        $response->getBody()->write(json_encode(array('error' => true, 'message' => 'Ha ocurrido un error')));
        return $response;

    }

});






$app->post('/voto', function (Request $request, Response $response) {

    $allPostPutVars = $request->getParsedBody();

    $rs = mysql_query('SELECT id FROM usuarios WHERE MD5(CONCAT("vespa", id)) = "' . mysql_real_escape_string($allPostPutVars['accessToken']) . '" LIMIT 1');
    $row = mysql_fetch_object($rs);
    if (mysql_num_rows($rs) == 1) {

        if ($allPostPutVars['like'] == 1) {

            mysql_query('INSERT INTO `votos` ( `top_id`, `usuario_id`) VALUES (
                                              "' . mysql_real_escape_string($allPostPutVars['idCancion']) . '",
                                              "' . $row->id . '"
                                              );');
        } else {

            mysql_query ('DELETE FROM `votos` WHERE

                                              top_id = "' . mysql_real_escape_string($allPostPutVars['idCancion']) . '"

                                              AND

                                              usuario_id =  "' . $row->id . '"

                                            ;');
        }

        $newResponse = $response->withHeader('Content-type', 'application/json');
        $newResponse->getBody()->write(json_encode(array('sussess' => true)));
        return $newResponse;

    }else{

        $newResponse = $response->withHeader('Content-type', 'application/json');
        $newResponse->getBody()->write(json_encode(array('error' => true)));
        return $newResponse;

    }

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