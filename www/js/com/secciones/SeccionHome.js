function SeccionHome()
{
	this.main = document.getElementById('SeccionHome');

	//alert('SeccionHome')
	//Port80 -> http://74.50.111.38/stream
	//Común-> http://198.178.121.76:8347/stream
	//http://74.50.111.38/currentsong?sid=1

	new Boton($('#btn-empezar'), empezar);

	function empezar(){



	}

	this._set = function (data){


		try {

			var myaudio = new Audio('http://198.178.121.76:8347/stream');
			myaudio.id = 'playerMyAdio';
			myaudio.onloadedmetadata=function(e){
				console.log(e)
			};
			myaudio.pregress=function(e){
				console.log(e)
			};
			myaudio.play();

		} catch (e) {

			alert('no audio support!');

		}

		ID3.loadTags('http://74.50.111.38/stream', function() {
			var tags = ID3.getAllTags("'http://74.50.111.38/stream");
			alert(tags.artist + " - " + tags.title + ", " + tags.album);
		});

	};

	this._remove = function (data){

	};


}

SeccionHome.prototype = new Base_Seccion();