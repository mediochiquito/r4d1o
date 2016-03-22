//Port80 -> http://74.50.111.38/stream
//Común-> http://198.178.121.76:8347/stream;stream.mp3

function SeccionHome() {

    this.main = document.getElementById('SeccionHome');
    this.name = 'Home';
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

    new Boton($('#home-btn-info'), function () {
        app.secciones.go(app.secciones._SeccionInfo, 300);
    });
    new Boton($('#home-btn-top'), function () {
        app.secciones.go(app.secciones._SeccionTop, 300);
    });
    new Boton($('#home-btn-email'), function () {
        app.secciones.go(app.secciones._SeccionContacto, 300);
    });




    if (app.esCordova && device.platform == "iOS") {

        RemoteCommand.enabled('nextTrack', false);
        RemoteCommand.enabled('previousTrack', false);
        RemoteCommand.on('play', iniciarRadio)
        RemoteCommand.on('pause', detenerRadio);

        //stream = new Stream(url_stream, onSuccess, onError);
        stream = new Audio(url_stream, onSuccess, onError);
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


    function consultar_cancion_actual() {


        $.ajax({
                method: "GET",
                url: app.SERVER + "currentSong.php",
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
                artwork:  app.SERVER + 'img/art.jpg',
                albumTitle: array_artita_cancion[0],
                artist: array_artita_cancion[1],
                title: "Super Radio Ta-ta"

            });

        }
    }
    function detenerRadio() {

        ecuchando = false;
        buffereando = false;
        $('#home-btn-play-pause').addClass("enpausa");

        if (app.esCordova && device.platform == "iOS") {
            ///stream.stop();
            stream.pause();

            NowPlaying.set({
                artwork:  app.SERVER + 'img/art.jpg',
                albumTitle: "",
                artist: '',
                title: "Super Radio Ta-ta"

            });

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


    function iniciarRadio() {

        ecuchando = true;
        if (buffereando) return;
        buffereando = true;

        $('#home-btn-play-pause').removeClass("enpausa");


        //ios
        if (app.esCordova && device.platform == "iOS") {
            stream.load()
            stream.play()
            NowPlaying.set({
                artwork:  app.SERVER + 'img/art.jpg',
                albumTitle: "Cargando...",
                artist: '',
                title: "Super Radio Ta-ta"
            });
          //  stream.play();
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


    this._set = function (data) {


    };

    this._remove = function (data) {

    };

}

SeccionHome.prototype = new Base_Seccion();