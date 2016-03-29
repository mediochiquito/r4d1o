app.factory('Actividades', function($resource) {
  
  return $resource('../api/actividades/:id?access_token=CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD', {actividades_id:"@_actividades_id"}, {
      update: {method: 'PUT',    params: {actividades_id:"@_actividades_id"}}
  })

});

app.factory('OrdenActividades', function($resource) {
  
  return $resource('../api/ordenActividades', {})

});




app.controller('ActividadesCtrl', function($scope, $http, $document, $routeParams, Upload, $rootScope, $mdDialog, Actividades, OrdenActividades) {


    $rootScope.seccion = 'Actividades';
    $scope.actividad = {};
    $scope.status_item_antes_de_editar = {};
    $scope.array_actividades = [];

    $scope.array_images_galeria = [];

    Actividades.get(function (data){

      $scope.array_actividades = data.data; 

    })

    $scope.foo = function ($item, $partFrom, $partTo, $indexFrom, $indexTo) {

        var array_ids_orden = new Array();
        for(var i=0; i<$scope.array_actividades.length; i++){

           array_ids_orden.push($scope.array_actividades[i].actividades_id);

        }

        OrdenActividades.save( array_ids_orden  , function (data){

            // alert(data);
   
        })


    };



    $scope.$watch('actividad.actividades_activo', function (a, d) {
     
      if(a==1 || a === true)  $scope.actividad.actividades_activo = true;
      else      $scope.actividad.actividades_activo = false;

    });


    $scope.$watch('filesGaleria', function () {
         
         try{
             $scope.upload($scope.filesGaleria, 'filesGaleria');
         }catch(e){}
    
    });
   $scope.$watch('filesChica', function () {
         
         try{
             $scope.upload($scope.filesChica, 'filesChica');
         }catch(e){}
    
    });
  
   
    $scope.upload = function (files, $type) {

       if (files && files.length) {

            var cant_subir = files.length;
            var subidas = 0;

            for (var i = 0; i < cant_subir; i++) {

                var file = files[i];

                Upload.upload({

                    url: '../api/actividades/upload_pic',
                    file: file

                }).progress(function (evt) {
                  
                  $rootScope.cargando = true; 
                  
                }).success(function (data, status, headers, config) {

                    if($type == 'filesChica')   $scope.actividad.actividades_imagen_thumb = data.filename;


                    if($type == 'filesGaleria') {

                        if($scope.actividad.actividades_imagenes_galeria == null || $scope.actividad.actividades_imagenes_galeria == ""){
                            $scope.actividad.actividades_imagenes_galeria = new Array();
                        }

                        $scope.actividad.actividades_imagenes_galeria.push(data.filename);

                     }
                   

                    subidas++;
                    if(subidas==cant_subir)  $rootScope.cargando = false;     

                }).error(function (data, status, headers, config) {
                    
                    console.log('error status: ' + status);

                })
              }

        }
    };
  
    $scope.submitForm = function() {
        
        $rootScope.cargando = true; 

        if(angular.isDefined($scope.actividad.actividades_id)){
          
             Actividades.update({id: $scope.actividad.actividades_id}, $scope.actividad, function (data){

              if(data.response){
                $scope.hide()
              }else{
                alert(data.error)
              }
              $rootScope.cargando = false;    

        })

        }else{

           Actividades.save( $scope.actividad, function (data){

              if(data.response){

                $scope.hide()
                $scope.actividad.actividades_id = data.response
                
                try{

                  $scope.array_actividades.unshift($scope.actividad)
   
                }catch(e){
                     $scope.array_actividades = new Array();
                    $scope.array_actividades.push($scope.actividad)
                }

              }else{
                alert(data.error)
              }

              $rootScope.cargando = false;    
   
          })
        }

      
    };

    $scope.add = function ($e){
      
        $scope.actividad = {
            
            actividades_titulo:'',
            actividades_desc:'',
            actividades_yt:'',
            actividades_imagen_thumb:'',
            actividades_activo: true, 
            
        }

        $scope.showForm($e)
    }

    $scope.eliminar = function ($item, ev){

        var confirm = $mdDialog.confirm()
                                        .parent(angular.element(document.body))
                                        .title('Alerta')
                                        .content('Seguro que quieres eliminar este Actividades banner?')
                                        .ariaLabel('eliminar confirm')
                                        .ok('Aceptar')
                                        .cancel('Cancelar')
                                        .targetEvent(ev);
                  
            $mdDialog.show(confirm).then(function() {
              
              $rootScope.cargando = true;    
              
                Actividades.delete({id: $item.actividades_id},  function (data){

                if(data.response){

                    $item.actividades_eliminado = 1;
                
                }else{
                
                }

                $rootScope.cargando = false; 

              })


          }, function() { });


    }



    $scope.editar = function ($item, $e){

      $rootScope.cargando = true;  

      Actividades.get({id: $item.actividades_id}, function (data){


        angular.copy(data.data, $item);

        $scope.actividad = $item; 
        $rootScope.cargando = false;     
        $scope.showForm($e)
        angular.copy($scope.actividad, $scope.status_item_antes_de_editar);
      })


    }


     $scope.hide = function() {
        $mdDialog.hide();

      };
      $scope.cancel = function() {
        $mdDialog.cancel();


      };
      $scope.answer = function(answer) {
       
        $mdDialog.hide(answer);

        angular.copy( $scope.status_item_antes_de_editar, $scope.actividad);
     

      };


     $scope.showForm = function(e) {
        
        $mdDialog.show({
      
         scope: $scope, 
          templateUrl: 'views/actividades-form.html',
          preserveScope :true,
          parent: angular.element(document.body), 
          targetEvent: e,
         
        })

        .then(function(answer) {
            // $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
            // $scope.alert = 'You cancelled the dialog.';
        });
      };



});








app.filter('FitroActividadesOrder', [function () {
    
    function ordenar(a, b){
           return a.actividades_orden-b.actividades_orden
    };

    return function (elarray) {
          
          elarray.sort(ordenar)
    
         return elarray;
       
    };

}]);
