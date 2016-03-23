function SeccionContacto() {
    this.name = "Mensaje";
    this.main = document.getElementById('SeccionContacto');


    autosize($('textarea'));


}

SeccionContacto.prototype = new Base_Seccion();