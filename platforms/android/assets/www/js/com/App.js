function App() {

    var self = this;
    this.secciones;

    this.toastmessage = null;
    this.loading = null;
    this.esCordova = false;
    this.SREVER = 'http://192.168.235.140/r4d1o/server/';


    this.initialize = function ($esCordova) {

        app.esCordova = $esCordova;

        self.secciones = new Secciones();

        app.secciones.go(app.secciones._SeccionHome, 300);

        if ($esCordova) {


        }


    };





}