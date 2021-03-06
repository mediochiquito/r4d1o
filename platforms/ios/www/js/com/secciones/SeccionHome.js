//Port80 -> http://74.50.111.38/stream
//Común-> http://198.178.121.76:8347/stream;stream.mp3

function SeccionHome() {

    this.main = document.getElementById('SeccionHome');
    this.name = 'Home';
    var stream;
    var url_stream = 'http://74.50.111.38/stream/';
    var ecuchando = false;
    var buffereando = false;
    var escuchando_artista = '';
    var escuchando_cancion = '';
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);


    setTimeout(function () {

        consultar_cancion_actual();
        iniciarRadio();

    }, 100);

    new Boton($('#home-btn-play-pause'), function () {
        if (ecuchando) {
            detenerRadio();
        } else {
            iniciarRadio();
        }
    });


    function compartir_cancion() {

     
        if (app.esCordova) {

            // facebookConnectPlugin.showDialog({
            //         method: "share",
            //         picture:'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
            //         name:'Test Post',
            //         message:'First photo post',
            //         caption: 'Testing using phonegap plugin',
            //         description: 'Posting photo using phonegap facebook plugin'
            //     }, function (response) {
            //         console.log(response)
            //     }, function (response) {
            //         console.log(response)
            //     }
            // );


            // var urt_store = "https://play.google.com/store?hl=es";
            // if (device.platform == "iOS") urt_store = "https://itunes.apple.com/es/genre/ios/id36?mt=8";

            //

            facebookConnectPlugin.showDialog({

                method: "share",
                href: encodeURI(app.SERVER  + '?c=' + escuchando_cancion + '&a=' + escuchando_artista)

                }, function () {

            });


           // window.plugins.socialsharing.share("Estoy escuchando " + escuchando_cancion + ' por ' + escuchando_artista + ' en Super Radio Ta-Ta', "Super Radio Ta-Ta", app.SERVER + 'img/art.jpg', urt_store);
        }
    }


    new Boton($('#home-btn-fb'), compartir_cancion);


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
        RemoteCommand.on('play', iniciarRadio);
        RemoteCommand.on('pause', detenerRadio);

        stream = new Audio(url_stream, onSuccess, onError);
    }


    function onOnline() {

    }

    function onOffline() {
        detenerRadio();
    }


    function onSuccess() {
        console.log("playAudio():Audio Success");
        buffereando = false;
    }

    function onError(error) {
        app.alerta('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        buffereando = false;
    }


    function consultar_cancion_actual() {

        try {

            if (navigator.connection.type == Connection.NONE) {

                $('#home-txt-artista').html('Ocurrio un error!');
                $('#home-txt-cancion').html('(No hay conexion a internet)');
                setTimeout(consultar_cancion_actual, 3000);
                return;
            }

        } catch (e) {
        }

        $.ajax({
                method: "GET",
                cache: false,
                url: app.SERVER + "api/current_song"

            })
            .done(function (msg) {


                setTimeout(consultar_cancion_actual, 3000);
                setNombreCancion(msg);


            })
            .error(function () {

                setTimeout(consultar_cancion_actual, 3000);

            });


    }

    function setNombreCancion(msg) {

        var array_artita_cancion = msg.split(' - ');

        $('#home-txt-artista').html(array_artita_cancion[0]);
        $('#home-txt-cancion').html(array_artita_cancion[1]);


        escuchando_artista = array_artita_cancion[0];
        escuchando_cancion = array_artita_cancion[1];

        if (app.esCordova && device.platform == "iOS") {

            NowPlaying.set({
                artwork: app.SERVER + 'img/art.jpg',
                albumTitle: array_artita_cancion[0],
                artist: array_artita_cancion[1],
                title: "Super Radio Ta-ta"

            });

        }

        if (app.esCordova && device.platform == "Android") {
            try {
                navigator.RADIO.setInfo(array_artita_cancion[0], array_artita_cancion[1]);
            } catch (e) {
            }

        }

    }

    this.stopAudioFromNotification = function () {
        detenerRadio();
    };


    function detenerRadio() {

        ecuchando = false;
        buffereando = false;
        $('#home-btn-play-pause').addClass("enpausa");

        if (app.esCordova && device.platform == "iOS") {
            ///stream.stop();
            stream.pause();

            NowPlaying.set({
                artwork: app.SERVER + 'img/art.jpg',
                albumTitle: "",
                artist: '',
                title: "Super Radio Ta-ta"

            });

        }

        if (app.esCordova && device.platform == "Android") {

            navigator.RADIO.stop(function (s) {

            }, function (s) {

            });
            //stream.pause();
        }

        if (!app.esCordova) {

            stream.pause();
        }

    }


    function iniciarRadio() {

        if (navigator.connection.type == Connection.NONE) {
            app.alerta("Debes estar conectado a internet para escuchar.");
            return;
        }


        ecuchando = true;
        if (buffereando) return;
        buffereando = true;

        $('#home-btn-play-pause').removeClass("enpausa");


        //ios
        if (app.esCordova && device.platform == "iOS") {
            stream.load();
            stream.play();
            NowPlaying.set({
                artwork: app.SERVER + 'img/art.jpg',
                albumTitle: "Cargando...",
                artist: '',
                title: "Super Radio Ta-ta"
            });

        }

        //android
        if (app.esCordova && device.platform == "Android") {

            //
            navigator.RADIO.play(function (s) {
                // alert(s);

            }, function (s) {
                alert('Error al iniciar la radio.');
            }, url_stream, 'Super Radio Ta-Ta', '');


            //window.plugins.stream.action({act:'play', path: url_stream},function(){},function(){});

            //stream = new Media(url_stream, function(){
            //    alert('ok')
            //}, function(){
            //    alert('error')
            //},function(e){
            //    alert("strem status" + e)
            //});
            //
            //stream.play()

            //  aacdecoder.mediaPlayer(url_stream);
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