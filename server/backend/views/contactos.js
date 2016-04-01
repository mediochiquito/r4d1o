
app.factory('Contactos', function ($resource) {

    return $resource('../api/contacts?access_token=CAACEdEose0cBAAGe36P5c8EBf5nZA5Wjt5oBZA6cqFBIaWZA2H00oPLudW93pbTVSdrRe3UoLun4X6NPhRov9DxN5UP3KUIGaF4vjE43xNMGlvSnmxsewiTubtJgC154G1dUrsTBqoywkLcQfoRJyn8fp4MbBRcXcUFlsoYHF8YD6G19ShMUQWX1hUJm1tcZBnB69ZAvZCYwZDZD')

});



app.controller('ContactosCtrl', function ($scope, $http, $document, $routeParams, $rootScope, $mdToast, $mdDialog, Contactos) {
    $rootScope.seccion = 'Contactos';
    $scope.array_contactos =  [];

    Contactos.get(function (data) {
        $scope.array_contactos = data.data;
    });

});
