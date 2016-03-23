function App() {

    var self = this;
    this.secciones;

    this.toastmessage = null;
    this.loading = null;
    this.esCordova = false;
    //this.SERVER = 'http://192.168.235.140/r4d1o/server/';
   this.SERVER = 'http://192.168.0.3/r4d1o/server/';
    var en_seccion;
    var toolbar;



    this.initialize = function ($esCordova) {

        $(document).bind( "PRE_CHANGE_SECCION", doCambioSeccion)
        toolbar = $("#toolbar");
        app.esCordova = $esCordova;

        self.secciones = new Secciones();

        app.secciones.go(app.secciones._SeccionHome, 300);

        if ($esCordova) {


        }

       new Boton($("#toolbal-btn-volver"), doVoler)

    };

    function doVoler() {


        app.secciones.go(app.secciones._SeccionHome, 300);

    }


    function doCambioSeccion(e){

        en_seccion = e.seccion;

        if(e.seccion == app.secciones._SeccionHome){
            $(toolbar).removeClass("open");
        }else{
            $(toolbar).find('#toolbal-label').html(en_seccion.name);
            $(toolbar).addClass("open");
        }

    }





}