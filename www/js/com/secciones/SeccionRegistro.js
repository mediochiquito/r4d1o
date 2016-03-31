function SeccionRegistro() {

    this.name = "Registro";
    this.main = document.getElementById('SeccionRegistro');

    $('#registro-edad').numeric();
    var callback = null;
    var btn_enviar = new Boton($('#registro-btn-enviar'), enviar);

    this._set = function (obj){
        callback = obj.callback;
        btn_enviar.habil(true);
    };

    function enviar() {

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

        if (stringVacio($('#registro-edad').val())) {
            $('#registro-edad').addClass('registro-campo-error');
            r = false;
        }

        if (stringVacio($('#registro-tel').val())) {
            $('#registro-tel').addClass('registro-campo-error');
            r = false;
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

        $.ajax({
            url: app.SERVER + 'api/register',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: onGuardoRegistro,
            error: function (){

                btn_enviar.habil(true);
            }
        })

    }

    function onGuardoRegistro(json) {

        if(json.error){

            btn_enviar.habil(true);

        }else{


            window.localStorage.setItem("accessToken", json.accessToken);

            setTimeout(function (){
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