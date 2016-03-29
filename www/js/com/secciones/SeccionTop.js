function SeccionTop() {


    this.name = "Ranking";
    this.main = document.getElementById('SeccionTop');

    setTimeout(cargar_lista, 0);

    function cargar_lista(){

        $.ajax({
                method: "GET",
                dataType: "json",
                url: app.SERVER + "api/top_songs"
            })
            .done(listar)
            .error(function () {




            });

    }


    function listar(json){

        var html = "";

        json.data.forEach(function (item){

            html += "<div class='item'>" +
                        "<div class='btn-like btn' data-btn-fx='zoom'>" +
                        "<img src='img/top/corazon.png' />" +
                        "</div>" +
                        "<div class='data'>" +
                            "<div class='artista'>"+item.artista+"</div>" +
                            "<div class='cancion'>"+item.cancion+"</div>" +
                        "</div>" +
                    "</div>";


        });

        $('#top-content > div > div > div').html(html);





        setTimeout(function(){

            $('.btn-like').each(function (index, elem){

                new Boton(elem, function (){

                    if(window.localStorage.getItem('uid') == 0){

                        app.secciones.go(app.secciones._SeccionRegistro, 300);
                        return;
                    }
                    //    $(elem).addClass('iLike')


                })

            });

        }, 0)

    }




}

SeccionTop.prototype = new Base_Seccion();