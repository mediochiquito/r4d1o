function SeccionHome()
{
	this.main = document.getElementById('SeccionHome');

	//alert('SeccionHome')
	//Port80 -> http://74.50.111.38/stream
	//Común-> http://198.178.121.76:8347/stream

	new Boton($('#btn-empezar'), empezar);

	function empezar(){





	}

	this._set = function (data){
		try {

			var myaudio = new Audio('http://198.178.121.76:8347/stream');
			myaudio.id = 'playerMyAdio';
			myaudio.play();

		} catch (e) {

			alert('no audio support!');

		}
	};

	this._remove = function (data){

	};


}

SeccionHome.prototype = new Base_Seccion();