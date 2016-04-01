app.factory('Canciones', function ($resource) {

    return $resource('../api/songs/:id?access_token=CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD', {id: "@_id"}, {
        update: {method: 'PUT', params: {id: "@_id", charge: true}}
    })

});

app.factory('TodasLasCanciones', function ($resource) {

    return $resource('../api/songs/all/?access_token=CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD')

});

app.factory('Ranking', function ($resource) {

    return $resource('../api/ranking?access_token=CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD')

});




app.controller('CancionesCtrl', function ($scope, $http, $document, $routeParams, $rootScope, $mdToast, $mdDialog, Canciones, TodasLasCanciones, Ranking) {


    var last = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };

    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };
    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }


    $rootScope.seccion = 'Canciones y Votos';
    $scope.cancion = {};
    $scope.status_item_antes_de_editar = {};
    $scope.array_canciones = [];
    $scope.array_ranking = [];

    Canciones.get(function (data) {
        $scope.array_canciones = data.data;
    });

    function getRanking() {

        Ranking.get(function (data) {
            $scope.array_ranking = data.data;
            $rootScope.cargando = false;
        });

    }

    getRanking();

    $scope.resetVotos = function (ev) {

        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Alerta')
            .content('Seguro que quieres borrar todos los votos?')
            .ariaLabel('eliminar confirm')
            .ok('Aceptar')
            .cancel('Cancelar')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function () {

            $rootScope.cargando = true;

            Ranking.delete(function (){
                getRanking();
            })


        }, function () {
        });




    };

    $scope.editarCanciones = function () {

        $rootScope.cargando = true;

        TodasLasCanciones.save($scope.array_canciones, function (data) {

            $rootScope.cargando = false;
            getRanking();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Canciones guardadas con exito!')
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
            );

        })

    };

    $scope.submitForm = function () {

        $rootScope.cargando = true;

        if (angular.isDefined($scope.cancion.id)) {

            Canciones.update({id: $scope.cancion.id}, $scope.cancion, function (data) {
                if (data.response) {
                    $scope.hide()
                } else {
                    alert(data.error)
                }
                $rootScope.cargando = false;

            })

        } else {

            Canciones.save($scope.cancion, function (data) {

                if (data.response) {

                    $scope.hide();
                    $scope.cancion.id = data.response

                    try {

                        $scope.array_canciones.push($scope.cancion)

                    } catch (e) {
                        $scope.array_canciones = new Array();
                        $scope.array_canciones.push($scope.cancion)
                    }
                    getRanking();
                } else {
                    alert(data.error)
                }

                $rootScope.cargando = false;

            })
        }

    };

    $scope.add = function ($e) {

        $scope.cancion = {

            artista: '',
            cancion: ''

        }

        $scope.showForm($e)
    };


    $scope.eliminar = function ($item, ev) {

        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Alerta')
            .content('Seguro que quieres eliminar esta cancion?')
            .ariaLabel('eliminar confirm')
            .ok('Aceptar')
            .cancel('Cancelar')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function () {

            $rootScope.cargando = true;

            Canciones.delete({id: $item.id}, function (data) {

                if (data.response) {

                    $item.eliminada = 1;

                } else {

                }
                getRanking();
                $rootScope.cargando = false;

            })


        }, function () {
        });


    }


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

    $scope.hide = function () {
        $mdDialog.hide();

    };
    $scope.cancel = function () {
        $mdDialog.cancel();

    };
    $scope.answer = function (answer) {

        $mdDialog.hide(answer);

        angular.copy($scope.status_item_antes_de_editar, $scope.cancion);


    };


    $scope.showForm = function (e) {

        $mdDialog.show({

                scope: $scope,
                templateUrl: 'views/cancion-form.html',
                preserveScope: true,
                parent: angular.element(document.body),
                targetEvent: e

            })

            .then(function (answer) {
                // $scope.alert = 'You said the information was "' + answer + '".';
            }, function () {
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
