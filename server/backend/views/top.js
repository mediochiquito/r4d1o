app.factory('Top', function($resource) {
  
  return $resource('../api/top_songs', {id:"@_id"}, {
      update: {method: 'PUT',    params: {id:"@_id"}}
  })

});






app.controller('TopCtrl', function($scope, $http, $document, $routeParams, $rootScope, $mdDialog, Top) {


    $rootScope.seccion = 'Canciones y Votos';
    $scope.top = {};
    $scope.status_item_antes_de_editar = {};
    $scope.array_tops = [];


    Top.get(function (data){
      $scope.array_tops = data.data;
        console.log($scope.array_tops)
    })



    //$scope.submitForm = function() {
    //
    //    $rootScope.cargando = true;
    //
    //    if(angular.isDefined($scope.actividad.actividades_id)){
    //
    //         Top.update({id: $scope.actividad.actividades_id}, $scope.actividad, function (data){
    //
    //          if(data.response){
    //            $scope.hide()
    //          }else{
    //            alert(data.error)
    //          }
    //          $rootScope.cargando = false;
    //
    //    })
    //
    //    }else{
    //
    //       Actividades.save( $scope.actividad, function (data){
    //
    //          if(data.response){
    //
    //            $scope.hide()
    //            $scope.actividad.actividades_id = data.response
    //
    //            try{
    //
    //              $scope.array_actividades.unshift($scope.actividad)
    //
    //            }catch(e){
    //                 $scope.array_actividades = new Array();
    //                $scope.array_actividades.push($scope.actividad)
    //            }
    //
    //          }else{
    //            alert(data.error)
    //          }
    //
    //          $rootScope.cargando = false;
    //
    //      })
    //    }
    //
    //
    //};

    $scope.add = function ($e){
      
        $scope.top = {
            
            artista:'',
            cancion:''
            
        }

        $scope.showForm($e)
    }

    //$scope.eliminar = function ($item, ev){
    //
    //    var confirm = $mdDialog.confirm()
    //                                    .parent(angular.element(document.body))
    //                                    .title('Alerta')
    //                                    .content('Seguro que quieres eliminar este Actividades banner?')
    //                                    .ariaLabel('eliminar confirm')
    //                                    .ok('Aceptar')
    //                                    .cancel('Cancelar')
    //                                    .targetEvent(ev);
    //
    //        $mdDialog.show(confirm).then(function() {
    //
    //          $rootScope.cargando = true;
    //
    //            Actividades.delete({id: $item.actividades_id},  function (data){
    //
    //            if(data.response){
    //
    //                $item.actividades_eliminado = 1;
    //
    //            }else{
    //
    //            }
    //
    //            $rootScope.cargando = false;
    //
    //          })
    //
    //
    //      }, function() { });
    //
    //
    //}


    //
    //$scope.editar = function ($item, $e){
    //
    //  $rootScope.cargando = true;
    //
    //  Actividades.get({id: $item.actividades_id}, function (data){
    //
    //
    //    angular.copy(data.data, $item);
    //
    //    $scope.actividad = $item;
    //    $rootScope.cargando = false;
    //    $scope.showForm($e)
    //    angular.copy($scope.actividad, $scope.status_item_antes_de_editar);
    //  })
    //
    //
    //}


     $scope.hide = function() {
        $mdDialog.hide();

      };
      $scope.cancel = function() {
        $mdDialog.cancel();

      };
      $scope.answer = function(answer) {
       
        $mdDialog.hide(answer);

        angular.copy( $scope.status_item_antes_de_editar, $scope.top);
     

      };


     $scope.showForm = function(e) {
        
        $mdDialog.show({
      
         scope: $scope, 
          templateUrl: 'views/top-form.html',
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






//
//
//app.filter('FitroActividadesOrder', [function () {
//
//    function ordenar(a, b){
//           return a.actividades_orden-b.actividades_orden
//    };
//
//    return function (elarray) {
//
//          elarray.sort(ordenar)
//
//         return elarray;
//
//    };
//
//}]);
