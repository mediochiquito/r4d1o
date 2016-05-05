function Base_Seccion(){

	var self = this;
	this.main = document.createElement('div');
	this.main.className = 'seccion';

	this.getAlto = function (){

		return $(this.main).height()
	};
	
	this.mostrar = function($time, $data, $dir){

		var _self = this;
		var t = $time

		$(_self.main).show();
		$(_self.main).removeClass('seccionOculta');
		$(_self.main).transition({
			scale:1,
			y:0,
			opacity: 1
		}, t, function(){

			$(_self.main).css('pointer-events', 'auto');

		});

		this._set($data);
		
	};

	this._set = function ($data){

	};

	this._remove = function(){

	};

	this.ocultar = function($time, $dir){

		var _self = this;
		var t = $time;
		_self._remove();
		$(_self.main).css('pointer-events', 'none');
		$(_self.main).transition({
			scale:.9,
			y:0,
			opacity: 0
		}, t, function(){
			$(_self.main).addClass('seccionOculta');
		});

	}


}