function SeccionRegistro() {

    this.name = "Registro";
    this.main = document.getElementById('SeccionRegistro');

    $('#registro-edad').numeric();


    new Boton($('#registro-btn-enviar'), enviar);

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

        if (stringVacio($('#registro-email').val())) {
            $('#registro-email').addClass('registro-campo-error');
            r = false;
        }

        if (stringVacio($('#registro-edad').val()) || !esMailValido($('#registro-edad').val())) {
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




        var obj = new Object();

        obj.nombre = $('#registro-nombre').val();
        obj.apellido = $('#registro-apellido').val();
        obj.email = $('#registro-email').val();
        obj.sexo = $('input[name=gender]:checked').val();
        obj.edad = $('#registro-edad').val();
        obj.tel = $('#registro-tel').val();

        $.ajax({
            url: 'api/register',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: onGuardoRegistro
        });

    }

    function onGuardoRegistro(json){

        alert(json);

    }

    function esMailValido($str) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($str);
    }

    function stringVacio($str) {

        return $str.replace(/(^\s*)|(\s*$)|[ ]/g, "").length == 0;

    }

}

SeccionRegistro.prototype = new Base_Seccion();