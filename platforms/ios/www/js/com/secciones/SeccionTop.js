function SeccionTop() {


    this.name = "Ranking";
    this.main = document.getElementById('SeccionTop');

    setTimeout(cargar_lista, 0);

    document.addEventListener("online", onOnline, false);

    function onOnline() {
        cargar_lista();
    }

    function cargar_lista() {

        try {
            if (navigator.connection.type == Connection.NONE) {
                $('#top-content > div > div > div').html('<div id="no-internet">No hay conexion a internet</div>');
                return;
            }
        } catch (e) {
        }


        var obj = new Object();
        obj.accessToken = window.localStorage.getItem('accessToken');

        $.ajax({
                method: "GET",
                dataType: "json",
                data: obj,
                url: app.SERVER + "api/songs"
            })
            .done(listar)
            .error(function () {

            });

    }


    function voto($elem) {
        try {
            if (navigator.connection.type == Connection.NONE) {
                app.alerta("Debes estar conectado a internet para votar.");
                return;
            }
        } catch (e) {
        }

        var like = 0;
        if ($($elem).hasClass('iLike')) {
            like = 0;
            $($elem).removeClass('iLike');
        } else {
            like = 1;
            $($elem).addClass('iLike');
        }

        var obj = new Object();
        obj.idCancion = $($elem).attr('data-id-cancion');
        obj.accessToken = window.localStorage.getItem('accessToken');
        obj.like = like;

        $.ajax({
            url: app.SERVER + 'api/voto',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: function (json) {

                if (json.error) {
                    $($elem).removeClass('iLike');
                    app.secciones.go(app.secciones._SeccionRegistro, 300, {
                        callback: function () {
                            voto($elem);
                        }
                    });

                }
            },
            error: function () {
            }
        })
    }


    function listar(json) {

        var html = "";
        var bulce = 0;
        json.data.forEach(function (item) {


            var like = "";
            if (item.like) like = "iLike";
            var primeras = "";
            if(bulce<12) primeras = "semanales";
            bulce++;

            html += "<div class='item " + primeras + "' >" +
                "<div class='btn-like btn " + like + "' data-btn-fx='zoom' data-id-cancion='" + item.id + "'>" +
                "<img src='img/top/corazon.png' />" +
                "</div>" +
                "<div class='data'>" +
                "<div class='artista'>" + item.artista + "</div>" +
                "<div class='cancion'>" + item.cancion + "</div>" +
                "</div>" +
                "</div>";

        });

        $('#top-content > div > div > div').html(html);

        setTimeout(function () {

            $('.btn-like').each(function (index, elem) {

                new Boton(elem, function () {

                    if (window.localStorage.getItem('accessToken') == 0) {

                        app.secciones.go(app.secciones._SeccionRegistro, 300, {
                            callback: function () {
                                voto(elem);
                            }
                        });

                    } else {

                        voto(elem);

                    }

                })

            });

        }, 0)

    }


}

SeccionTop.prototype = new Base_Seccion();