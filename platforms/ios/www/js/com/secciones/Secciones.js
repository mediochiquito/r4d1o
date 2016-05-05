function Secciones(){ 
	
	var self = this;

	this._SeccionHome = new SeccionHome();
	this._SeccionHome.ocultar(0);

	this._SeccionInfo = new SeccionInfo();
	this._SeccionInfo.ocultar(0);

	this._SeccionTop = new SeccionTop();
	this._SeccionTop.ocultar(0);

	this._SeccionContacto = new SeccionContacto();
	this._SeccionContacto.ocultar(0);

    this._SeccionRegistro = new SeccionRegistro();
	this._SeccionRegistro.ocultar(0);

	var despazada = false;
	var historia = new Array();
	var obj_seccion_actual = null;	
	var cambiando_historia = false;
    var inter;

	document.addEventListener("backbutton", backKeyDown, false);

	function backKeyDown(){

		if(!cambiando_historia){

			if(historia.length<=1) 	{

				navigator.app.exitApp();
				e.preventDefault();

			}else{

				cambiando_historia = true;
				if(historia.length>1) historia.pop();
				var penultimo_elemento = historia[historia.length-1];
				app.secciones.go(penultimo_elemento[0], 300, penultimo_elemento[1], false);
				setTimeout(function (){
					cambiando_historia = false;
				}, 500)
			}

		}

	}

	this.get_obj_seccion_actual = function (){
		return obj_seccion_actual;
	};

	this.go = function($base_seccion, $time, $data, $guardar_historia, $dir){

		var event = jQuery.Event( "PRE_CHANGE_SECCION" );
			event.seccion = $base_seccion;
			$(document).trigger( event );

		var guardar_historia = true;
		if(typeof($guardar_historia) != 'undefined') guardar_historia =  $guardar_historia;

		if($base_seccion==obj_seccion_actual) return;
	
		var d = new Date();
		$(this.main).css({ display: 'block'});
		
		try{
			if($base_seccion != obj_seccion_actual)
				obj_seccion_actual.ocultar($time, $dir);
		}catch(e){}
		
		if(guardar_historia) historia.push([$base_seccion, $data]);

		//setTimeout(function(){
		$base_seccion.mostrar($time, $data, $dir);
		//}, 500);

		obj_seccion_actual = $base_seccion

	}

	this._close_all = function(){
		
		$(document).trigger('CERRANDO_TODAS_LAS_SECCIONES');
		obj_seccion_actual.ocultar();
		obj_seccion_actual = null;

	}

}

