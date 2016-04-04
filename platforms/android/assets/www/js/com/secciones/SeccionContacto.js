function SeccionContacto() {

    this.name = "Mensaje";
    this.main = document.getElementById('SeccionContacto');
    autosize($('textarea'));

    var btn_enviar = new Boton($('#contacto-btn-enviar'), enviar);

    this._set = function (){

        btn_enviar.habil(true);
    };

    function reset(){


    }
    function enviar() {

        $('input').removeClass('registro-campo-error');

        var r = true;
        var msg = "";

        if (stringVacio($('#contacto-nombre').val())) {
            $('#contacto-nombre').addClass('registro-campo-error');
            r = false;
        }

        if (stringVacio($('#contacto-email').val()) || !esMailValido($('#contacto-email').val())) {
            $('#contacto-email').addClass('registro-campo-error');
            r = false;
        }

        if (stringVacio($('#contacto-mensaje').val())) {
            $('#contacto-mensaje').addClass('registro-campo-error');
            r = false;
        }


        if (!r) {
            app.alerta("Hay campos incompletos o erroneos.");
            return;
        }

        btn_enviar.habil(false);

        var obj = new Object();
        obj.nombre = $('#contacto-nombre').val();
        obj.email = $('#contacto-email').val();
        obj.mensaje = $('#contacto-mensaje').val();


        $.ajax({
            url: app.SERVER + 'api/contacts',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: onGuardoForm,
            error: function (){
                btn_enviar.habil(true);
                app.alerta("Error");
            }
        })

    }

    function onGuardoForm(json) {

        if(json.error){



        }else{

           $('#contacto-nombre').val("");
            $('#contacto-email').val("");
          $('#contacto-mensaje').val("");

        }
        btn_enviar.habil(true);
        app.alerta(json.message);

    }

    function esMailValido($str) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($str);
    }

    function stringVacio($str) {

        return $str.replace(/(^\s*)|(\s*$)|[ ]/g, "").length == 0;

    }
}

SeccionContacto.prototype = new Base_Seccion();