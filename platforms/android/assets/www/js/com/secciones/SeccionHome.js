function SeccionHome()
{
	this.main = document.getElementById('SeccionHome');

	//alert('SeccionHome')
	//Port80 -> http://74.50.111.38/stream
	//Común-> http://198.178.121.76:8347/stream
	//http://74.50.111.38/currentsong?sid=1

	new Boton($('#btn-empezar'), empezar);





// play a stream
	window.audioplayer.playstream( successCallback,
		function(){alert('aaaaa')},
		// stream urls to play on android/ios
		{
			android: "http://74.50.111.38/stream",
			ios: "http://74.50.111.38/stream"}
},
// metadata used for iOS lock screen, Android 'Now Playing' notification
{
	"title": "Cuomo; NJ Candidates; and Candy Etiquette",
	"artist": "The Brian Lehrer Show",
	"image": {
	"url": "https://media2.wnyc.org/i/300/300/l/80/1/governor_andrew_cuomo.jpg"
},
	"imageThumbnail": {
	"url": "https://media2.wnyc.org/i/60/60/l/80/1/governor_andrew_cuomo.jpg"
},
	"name": "WNYC 93.9 FM",
	"description": "News, Culture & Talk"
},
// javascript-specific json represenation of audio to be played, which will be passed back to
// javascript via successCallback when a stream is launched from a local notification (eg, the
// alarm clock

);



// callback method
var successCallback = function(result) {
	console.log('audio callback ' + JSON.stringify(result));
	if (result.type==='progress') {
		console.log('progress/duration/available - ' + result.progress + '/' + result.duration + '/' + result.available); // available not currently supported
	} else if (result.type==='state') {
		console.log('status - ' + result.state + '/' + result.description);
	} else if (result.type==='error') {
		console.log('error - ' + result.reason);
	} else if (result.type==='current') {
		console.log('current audio ' + JSON.stringify(result.audio));
	} else if (result.type==='next') {
		console.log('skip to next audio track'); // typically fired by remote control/lock screen controls
	} else if (result.type==='previous') {
		console.log('skip to previous track'); // typically fired by remote/control/lock screen controls
	} else {
		console.log('AudioCallback unhandled type (' + result.type + ')');
	}
};


try {
		//var myaudio = new Media('http://198.178.121.76:8347/stream', function (){
        //
		//	alert('myaudio');
        //
		//},
		//	// error callback
		//	function(err) {
		//		alert("playAudio():Audio Error: "+err);
		//	});
		//var myaudio = new Audio('http://74.50.111.38/stream');
		//myaudio.id = 'playerMyAdio';
		//myaudio.onloadedmetadata=function(e){
        //
		//};
		//myaudio.addEventListener('progress', function()
		//{
		//	var ranges = [];
		//	for(var i = 0; i < myaudio.buffered.length; i ++)
		//	{
		//		ranges.push([
		//			myaudio.buffered.start(i),
		//			myaudio.buffered.end(i)
		//		]);
		//	}
        //
		//	console.log(ranges[0])
        //
		//}, false);



	myaudio.play();

	} catch (e) {

		alert('no audio support!');

	}


	function empezar(){


		myaudio.play();

	}
	function loop(audio) {
		try {
		var buffered = audio.buffered;
		var loaded;
		var played;

		if (buffered.length) {
			loaded = 100 * buffered.end(0) / audio.duration;
			played = 100 * audio.currentTime / audio.duration;
			$('#buffer').html( loaded.toFixed(2) + ' - '+ played.toFixed(2));

		}


		}catch(e){}
		setTimeout(loop, 50);
	}
	this._set = function (data){





	};

	this._remove = function (data){

	};


}

SeccionHome.prototype = new Base_Seccion();