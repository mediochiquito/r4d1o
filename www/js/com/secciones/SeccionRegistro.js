function SeccionRegistro() {

    this.name = "Registro";
    this.main = document.getElementById('SeccionRegistro');
    var fbid = 0;
    $('#registro-edad').numeric();
    var callback = null;
    var btn_enviar = new Boton($('#registro-btn-enviar'), enviar);


    function loginFb() {

        var fbLoginSuccess = function (userData) {

            console.log(JSON.stringify(userData));

            facebookConnectPlugin.api(userData.authResponse.userID + "/?fields=id,email,gender,first_name,last_name", ["email", "public_profile"],

                function onSuccess(result) {

                    // console.log("Result: ", JSON.stringify(result));
                    fbid = result.id;
                    try {

                        if (result.gender) {

                            var sex = 'f';
                            if (result.gender == 'female') sex = 'f';
                            if (result.gender == 'male') sex = 'm';

                        }
                        $('input[name=gender][value=' + sex + ']').prop("checked", true);

                    } catch (e) {
                    }

                    $('#registro-nombre').val(result.first_name);
                    $('#registro-apellido').val(result.last_name);
                    $('#registro-email').val(result.email);


                    enviar(false)


                }, function onError(error) {

                    //console.error("Failed: ", error);
                    app.alerta('Ocurrio un error')
                }
            );

        };

        facebookConnectPlugin.login(["email", "public_profile"], fbLoginSuccess,
            function (error) {
                console.error(error)
            }
        );
    }

    new Boton($('#registro-btn-fb'), loginFb);


    this._set = function (obj) {
        callback = obj.callback;
        btn_enviar.habil(true);
    };

    function enviar($validar) {

        if (typeof($validar) == 'undefined') $validar = true;

        if (app.esCordova && navigator.connection.type == Connection.NONE) {
            app.alerta("Debes estar conectado a internet para regitrarte.");
            return;
        }

        $('input').removeClass('registro-campo-error');

        var r = true;
        var msg = "";


        if (stringVacio($('#registro-nombre').val())) {
            $('#registro-nombre').addClass('registro-campo-error');
            r = false;
        }

        if (stringVacio($('#registro-apellido').val())) {
            $('#registro-apellido').addClass('registro-campo-error');
            r = false;
        }

        if (stringVacio($('#registro-email').val()) || !esMailValido($('#registro-email').val())) {
            $('#registro-email').addClass('registro-campo-error');
            r = false;
        }


        if ($validar) {

            if (stringVacio($('#registro-edad').val())) {
                $('#registro-edad').addClass('registro-campo-error');
                r = false;
            }

            if (stringVacio($('#registro-tel').val())) {
                $('#registro-tel').addClass('registro-campo-error');
                r = false;
            }

        }


        if (!r) {
            app.alerta("Hay campos incompletos o erroneos.");
            return;
        }

        btn_enviar.habil(false);

        var obj = new Object();
        obj.nombre = $('#registro-nombre').val();
        obj.apellido = $('#registro-apellido').val();
        obj.email = $('#registro-email').val();
        obj.sexo = $('input[name=gender]:checked').val();
        obj.edad = $('#registro-edad').val();
        obj.tel = $('#registro-tel').val();
        obj.fbid = fbid
        $.ajax({

            url: app.SERVER + 'api/register',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: onGuardoRegistro,
            error: function () {

                btn_enviar.habil(true);
                app.alerta("Error");
            }
        })

    }

    function onGuardoRegistro(json) {

        if (json.error) {

            btn_enviar.habil(true);

        } else {

            window.localStorage.setItem("accessToken", json.accessToken);

            setTimeout(function () {
                callback();
                app.secciones.go(app.secciones._SeccionTop, 300);
            }, 500);

        }

        app.alerta(json.message);

    }

    function esMailValido($str) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($str);
    }

    function stringVacio($str) {

        return $str.replace(/(^\s*)|(\s*$)|[ ]/g, "").length == 0;

    }

}

SeccionRegistro.prototype = new Base_Seccion();