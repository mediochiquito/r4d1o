//Port80 -> http://74.50.111.38/stream
//Común-> http://198.178.121.76:8347/stream;stream.mp3

function SeccionHome() {

    this.main = document.getElementById('SeccionHome');

    var stream;
    var url_stream = 'http://74.50.111.38/stream';
    var ecuchando = false;
    var buffereando = false;


    setTimeout(consultar_cancion_actual, 100);


    new Boton($('#home-btn-play-pause'), function () {

        if (ecuchando) {
            detenerRadio();
        } else {
            iniciarRadio();
        }
    });


    if (app.esCordova && device.platform == "iOS") {

        RemoteCommand.enabled('nextTrack', false);
        RemoteCommand.enabled('previousTrack', false);
        RemoteCommand.on('play', iniciarRadio)
        RemoteCommand.on('pause', detenerRadio);

    }


    function onSuccess() {
        console.log("playAudio():Audio Success");
        buffereando = false;
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        buffereando = false;
    }

    function detenerRadio() {

        ecuchando = false;
        buffereando = false;
        $('#home-btn-play-pause').addClass("enpausa");

        if (app.esCordova && device.platform == "iOS") {
            stream.stop();

        }

        if (app.esCordova && device.platform == "Android") {
            navigator.RADIO.stop(function (s) {
                console.log('SUCCESS navigator.RADIO.stop');
            }, function (s) {
                console.log('ERROR navigator.RADIO.stop');
            });
        }

        if (!app.esCordova) {

            stream.pause();
        }

    }

    function consultar_cancion_actual() {


        $.ajax({
                method: "GET",
                url: "http://192.168.0.3/r4d1o/server/currentSong.php",
                cache: false
            })
            .done(function (msg) {

                setNombreCancion(msg);

                setTimeout(consultar_cancion_actual, 3000);

            })
            .error(function () {

                setTimeout(consultar_cancion_actual, 3000);

            });


    }

    function setNombreCancion(msg) {

        var array_artita_cancion = msg.split(' - ');

        $('#home-txt-artista').html(array_artita_cancion[0]);
        $('#home-txt-cancion').html(array_artita_cancion[1]);

        if (app.esCordova && device.platform == "iOS") {

            NowPlaying.set({
                artwork: "img/art.jpg",
                albumTitle: array_artita_cancion[0],
                artist: array_artita_cancion[1],
                title: "Super Radio Ta-ta"
            });

        }
    }


    function iniciarRadio() {

        ecuchando = true;
        if (buffereando) return;
        buffereando = true;

        $('#home-btn-play-pause').removeClass("enpausa");

        //ios
        if (app.esCordova && device.platform == "iOS") {
            stream = new Stream(url_stream, onSuccess, onError);
            stream.play();
        }

        //android
        if (app.esCordova && device.platform == "Android") {
            navigator.RADIO.play(function (s) {
                alert(s);
                if (s == 'STOPPED') {

                }
            }, function (s) {
                alert('ERROR navigator.RADIO.play');
            }, url_stream, 'Super Radio Ta-Ta', '');
        }

        //browser
        if (!app.esCordova) {
            stream = new Audio(url_stream, onSuccess, onError);
            stream.play()
        }

    }

    /* function loop(audio) {
     try {
     var buffered = audio.buffered;
     var loaded;
     var played;

     if (buffered.length) {
     loaded = 100 * buffered.end(0) / audio.duration;
     played = 100 * audio.currentTime / audio.duration;
     $('#buffer').html(loaded.toFixed(2) + ' - ' + played.toFixed(2));

     }
     } catch (e) {
     }
     setTimeout(loop, 50);
     }*/

    this._set = function (data) {


    };

    this._remove = function (data) {

    };

}

SeccionHome.prototype = new Base_Seccion();