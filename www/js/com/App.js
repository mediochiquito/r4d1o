function App() {

    var self = this;
    this.secciones;

    this.toastmessage = null;
    this.loading = null;
    this.esCordova = false;
    this.uuid = 'dev';
    //this.SERVER = 'http://192.168.235.140/r4d1o/server/';
    //this.SERVER = 'http://192.168.0.3/r4d1o/server/';
    this.SERVER = 'http://dev.metamorf.com.uy/radiotata/';
    var en_seccion;
    var toolbar;


    this.initialize = function ($esCordova) {

        $(document).bind("PRE_CHANGE_SECCION", doCambioSeccion)
        toolbar = $("#toolbar");

        app.esCordova = $esCordova;

        if (app.esCordova) app.uuid = device.uuid;

        if (window.localStorage.getItem('accessToken') == null) window.localStorage.setItem('accessToken', 0);

        self.secciones = new Secciones();

        // app.secciones.go(app.secciones._SeccionTop, 300);
         app.secciones.go(app.secciones._SeccionHome, 300);

        if ($esCordova) {

        }

        new Boton($("#toolbal-btn-volver"), doVoler)

    };

    function doVoler() {
        if (app.secciones.get_obj_seccion_actual() == app.secciones._SeccionRegistro)
            app.secciones.go(app.secciones._SeccionTop, 300);
        else
            app.secciones.go(app.secciones._SeccionHome, 300);

    }


    function doCambioSeccion(e) {

        en_seccion = e.seccion;

        if (e.seccion == app.secciones._SeccionHome) {
            $(toolbar).removeClass("open");
        } else {
            $(toolbar).find('#toolbal-label').html(en_seccion.name);
            $(toolbar).addClass("open");
        }

    }


    this.alerta = function (msg) {

        try {
            plugins.toast.show(msg, 2000, "center");
        } catch (e) {
            alert(msg);
        }

    }


}