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
                        "<div class='btn-like'></div>" +
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



                })

            });

        }, 0)

    }




}

SeccionTop.prototype = new Base_Seccion();