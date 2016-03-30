function SeccionRegistro() {

    this.name = "Registro";
    this.main = document.getElementById('SeccionRegistro');

    $('#registro-edad').numeric();


    new Boton($('#registro-btn-enviar'), enviar);

    function enviar() {


        $('input').removeClass('registro-campo-error');

        var r = true;
        var msg = "";

        if (esVacio()) {
            $(input_nombre.main).addClass('registro-campo-error');
            r = false;
        }

        if (esVacio()) {
            $(input_apellido1.main).addClass('registro-campo-error');
            r = false;
        }

        if (input_email.esVacio()) {
            $(input_email.main).addClass('registro-campo-error');
            r = false;
        }

        if (!input_email.esVacio() && !input_email.esMailValido()) {
            $(input_email.main).addClass('registro-campo-error');
            r = false;
        }

        if (input_telefono.esVacio()) {
            $(input_telefono.main).addClass('registro-campo-error');
            r = false;
        }

        if (input_telefono.getValor().length < 10) {
            $(input_telefono.main).addClass('registro-campo-error');
            r = false;
        }

        if ($(select_dealer).val() == 0) {
            $(select_dealer).addClass('registro-campo-error');
            r = false;
        }
        if ($(select_modelo).val() == 0) {
            $(select_modelo).addClass('registro-campo-error');
            r = false;
        }

        if (!r) {
            app.toastmessage.mostrar("Hay campos incorrectos o errÃ³neos.");
            return;
        }

        if (!check_tyc.checked) {
            app.toastmessage.mostrar("Debes haber leÃ­do y aceptado las politicas de privacidad para continuar.");
            return;
        }

        var obj = new Object();
        obj.nombre = input_nombre.getValor();
        obj.apellido1 = input_apellido1.getValor();
        obj.apellido2 = input_apellido2.getValor();
        obj.email = input_email.getValor();
        obj.tel = input_telefono.getValor();
        obj.modelo = $(select_modelo).val();

        $.ajax({
            url: 'api/?method=register',
            type: 'post',
            cache: false,
            data: obj,
            success: onGuardoParticipacion
        });

    }

    function esMailValido($str) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($str);
    }

    function esVacio($str) {

        return $str.replace(/(^\s*)|(\s*$)|[ ]/g, "").length == 0;

    }

}

SeccionRegistro.prototype = new Base_Seccion();