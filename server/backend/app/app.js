var app = angular.module('adminApp', ['ngAnimate', 'ngMaterial', 'ngResource', 'ngRoute'])
    //, 'ngFileUpload', 'numfmt-error-module', 'angular-sortable-view'
    .config(['$routeProvider', '$mdThemingProvider',

        function ($routeProvider, $mdThemingProvider) {


            $routeProvider.when('/canciones', {
                templateUrl: 'views/canciones.html',
                controller: 'CancionesCtrl'
            }).when('/usuarios', {
                templateUrl: 'views/usuarios.html',
                controller: 'UsuariosCtrl'
            }).when('/contactos', {
                templateUrl: 'views/contactos.html',
                controller: 'ContactosCtrl'
            }).otherwise({
                redirectTo: '/canciones'
            });

            $mdThemingProvider.theme('default')
                .primaryPalette('purple', {'default': '900'})
                .accentPalette('pink', {'default': '900'});
        }
    ])


    .controller('AppCtrl', function ($scope, $document, $rootScope, $mdSidenav) {

        $scope.nombreSeccion = ''
        $scope.rootScope = $rootScope;
        $scope.cargando = false
        $rootScope.cargando = false;
        $rootScope.$watch('cargando', function () {
            $scope.cargando = $rootScope.cargando
        })

        $scope.openMenu = function () {

            $mdSidenav('left').open()
        }
        $scope.closeMenu = function () {

            $mdSidenav('left').close()
        }

    })

angular.module('numfmt-error-module', [])

    .run(function ($rootScope) {
        $rootScope.typeOf = function (value) {
            return typeof value;
        };
    })

    .directive('stringToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function (value) {
                    return parseFloat(value, 10);
                });
            }
        };
    });


window.addEventListener("dragover", function (e) {
    e = e || event;
    e.preventDefault();
}, false);
window.addEventListener("drop", function (e) {
    e = e || event;
    e.preventDefault();
}, false);