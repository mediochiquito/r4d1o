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

$app->get('/ranking', function (Request $request, Response $response) {

    $rs = mysql_query('SELECT * FROM `canciones`');

    $r = array();
    while($row = mysql_fetch_object($rs)){

        $rs2 = mysql_query('SELECT count(*) as total FROM `votos` WHERE cancion_id = ' . $row->id);
        $row2 = mysql_fetch_object($rs2);

        $r[] = array($row2->total, $row);


    }

    sort($r);
    $r2 =  array_reverse($r);
    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r2)));
    return $newResponse;

});


$app->get('/users', function (Request $request, Response $response) {

    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;

    $rs = mysql_query('SELECT * FROM usuarios ORDER BY id DESC');
    while ($row = mysql_fetch_object($rs)) {
        $r[] = $row;
    }

    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r)));
    return $newResponse;

});

$app->post('/contacts', function (Request $request, Response $response) {

    $allPostPutVars = $request->getParsedBody();

    if(mysql_query('INSERT INTO `contactos` ( `nombre`, `email`, `mensaje`) VALUES (

					"'.mysql_real_escape_string($allPostPutVars['nombre']).'",
					"'.mysql_real_escape_string($allPostPutVars['email']).'",
                    "'.mysql_real_escape_string($allPostPutVars['mensaje']).'")')){

        $newResponse = $response->withHeader('Content-type', 'application/json');
        $newResponse->getBody()->write(json_encode(array('message' => 'Tu mensaje ha sido enviado con exitos.')));
        return $newResponse;

    } else {

        $response->getBody()->write(json_encode(array('error' => true, 'message' => 'Ha ocurrido un error')));
        return $response;

    }

});


$app->get('/contacts', function (Request $request, Response $response) {

    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;

    $rs = mysql_query('SELECT * FROM contactos ORDER BY id DESC');
    while ($row = mysql_fetch_object($rs)) {
        $r[] = $row;
    }

    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r)));
    return $newResponse;

});


$app->delete('/ranking', function (Request $request, Response $response) {

    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;

    mysql_query('DELETE FROM `votos`');
    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('response' => 'ok')));
    return $newResponse;

});





$app->get('/songs[/]', function (Request $request, Response $response) {

    $rs_me = mysql_query('SELECT id FROM usuarios WHERE MD5(CONCAT("vespa", id)) = "' . mysql_real_escape_string($_GET['accessToken']) . '" LIMIT 1');
    $row_me = mysql_fetch_object($rs_me);

    $rs_mis_votos =  mysql_query('SELECT * FROM votos WHERE usuario_id = "' . mysql_real_escape_string($row_me->id) . '"');
    $array_mis_voto = array();
    while($row_mis_votos = mysql_fetch_object($rs_mis_votos)){
        $array_mis_voto[] = $row_mis_votos->cancion_id;
    }

    $rs = mysql_query('SELECT * FROM canciones ORDER BY id ASC');
    while ($row = mysql_fetch_object($rs)) {
        $row->like = in_array($row->id, $array_mis_voto);
        $r[] = $row;

    }

    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('data' => $r)));
    return $newResponse;

});


$app->post('/songs[/]', function (Request $request, Response $response) {

    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;
    $allPostPutVars = $request->getParsedBody();
    if(mysql_query('INSERT INTO `canciones` ( `artista`, `cancion`) VALUES (

					"'.mysql_real_escape_string($allPostPutVars['artista']).'",
                    "'.mysql_real_escape_string($allPostPutVars['cancion']).'")')){

        $newResponse = $response->withHeader('Content-type', 'application/json');
        $newResponse->getBody()->write(json_encode(array('response' => mysql_insert_id())));
        return $newResponse;

    }else{

        $response->getBody()->write(json_encode(array('error' => 'Ha ocurrido un error')));
        return $response;

    }
});





$app->post('/songs/all/', function (Request $request, Response $response) {

    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;
    $allPostPutVars = $request->getParsedBody();


     //print_r($allPostPutVars);

    foreach($allPostPutVars as $cancion){

        mysql_query ('UPDATE `canciones` SET

					artista = "' . $cancion['artista'] . '",
                    cancion = "' . $cancion['cancion'] . '"

					WHERE id = "'. $cancion['id'] . '"');

    }

    $newResponse = $response->withHeader('Content-type', 'application/json');
    $newResponse->getBody()->write(json_encode(array('response' => 'ok')));
    return $newResponse;

});



$app->delete('/songs/{id}', function (Request $request, Response $response) {

    if($_GET['access_token'] != 'CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD') return;

    $id = $request->getAttribute('id');

    $newResponse = $response->withHeader('Content-type', 'application/json');

    if(mysql_query('DELETE FROM  `canciones` WHERE id = "'.mysql_real_escape_string($id ).'"')){

        $newResponse->getBody()->write(json_encode(array('response' => $id)));

    }else{

        $newResponse->getBody()->write(json_encode(array('error' => 'Ha ocurrido un error')));


    }

    return $newResponse;



});






$app->post('/register', function (Request $request, Response $response) {

    $allPostPutVars = $request->getParsedBody();


    if($allPostPutVars['fbid'] != 0){

        $rs_usu =  mysql_query('SELECT id FROM usuarios WHERE fbid = "' . mysql_real_escape_string($allPostPutVars['fbid']) . '" LIMIT 1');
        $row_usu = mysql_fetch_object($rs_usu);
        if(mysql_num_rows($rs_usu)==1){
            $newResponse = $response->withHeader('Content-type', 'application/json');
            $newResponse->getBody()->write(json_encode(array('message' => 'Bienvenido nuevamente.', 'accessToken' => md5('vespa' . $row_usu->id))));
            return $newResponse;

        }

    }



    if (mysql_query('INSERT INTO `usuarios` ( `fbid`, `nombre`, `apellido`, `email`, `sexo`, `edad`, `tel`) VALUES (

					"' . mysql_real_escape_string($allPostPutVars['fbid']) . '",
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

            mysql_query('INSERT INTO `votos` ( `cancion_id`, `usuario_id`) VALUES (
                                              "' . mysql_real_escape_string($allPostPutVars['idCancion']) . '",
                                              "' . $row->id . '"
                                              );');
        } else {

            mysql_query ('DELETE FROM `votos` WHERE

                                              cancion_id = "' . mysql_real_escape_string($allPostPutVars['idCancion']) . '"

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



$app->run();