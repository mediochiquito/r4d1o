<?php
	session_start();
	session_cache_expire(360); //6 horas tiene cualquier persona antes que la session expire
	ob_start("ob_gzhandler");
	ignore_user_abort ( true );
	error_reporting( E_ALL ^ E_NOTICE ^ E_DEPRECATED );


	if($_SERVER['HTTP_HOST']=="192.168.0.3" ||  $_SERVER['HTTP_HOST']=="192.168.235.140" ||  $_SERVER['HTTP_HOST']=="localhost")
	{
		define("SERVER", "http://".$_SERVER['HTTP_HOST']."/r4d1o/server/", false);
		
		define("DB_HOST", "localhost");
		define("DB_USER", "root");
		define("DB_PASS", "root");
		define("DB_NAME", "radiotata");
		
	}elseif($_SERVER['HTTP_HOST']=="dev.metamorf.com.uy"){

		define("SERVER", "http://".$_SERVER['HTTP_HOST']."/radiotata/", false);

		define("DB_HOST", "localhost");

		define("DB_USER", "radiotata");
		define("DB_PASS", "tg9Lp3%5");
		define("DB_NAME", "metamorf_radiotata");

	}else{


		define("SERVER", "http://".$_SERVER['HTTP_HOST']."/", false);

		define("DB_HOST", "localhost");
		define("DB_USER", "");
		define("DB_PASS", "");
		define("DB_NAME", "");

}
		
	//DATE
	if(function_exists("date_default_timezone_set") and function_exists("date_default_timezone_get"))
    	@date_default_timezone_set(@date_default_timezone_get());


	//SQL
	$conexion_mysql = mysql_connect( DB_HOST, DB_USER, DB_PASS) or die('Could not connect to mysql server. ' . mysql_error() );
	mysql_select_db(DB_NAME) or die('Could not select database.' . DB_NAME);
	mysql_query("SET NAMES utf8");
	

	//LOGS
    if(sizeof($_POST) || sizeof($_GET))
    {
        $data = "\r\n".date('H:i:s').' - '.$_SERVER['REQUEST_URI'].' - |POST| <$POST$>';

        foreach($_POST as $key => $value)
            $rpl .=' '.$key.'='.$value.' &';
        
        $data = str_replace('<$POST$>', $rpl, $data);        
        
        file_put_contents(dirname(__FILE__).'/_logs/'.date('Y_m_d').'.txt', $data, FILE_APPEND);
        @chmod(dirname(__FILE__).'/_logs/'.date('Y_m_d').'.txt', 0777);
        
    }
