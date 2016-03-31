
var app = angular.module('adminApp', ['ngAnimate',  'ngMaterial', 'ngResource', 'ngRoute'])
//, 'ngFileUpload', 'numfmt-error-module', 'angular-sortable-view'
.config(['$routeProvider', '$mdThemingProvider',
 
  function($routeProvider, $mdThemingProvider) {
   

    $routeProvider.
      when('/top', {
        templateUrl: 'views/top.html',
        controller: 'TopCtrl'
      }).
    
      otherwise({
        redirectTo: '/top'
      });

     $mdThemingProvider.theme('default')
         .primaryPalette('deep-orange', {'default': '900'})
        .accentPalette('orange', {'default': '900'});
      }
 ])




.controller('AppCtrl', function($scope, $document, $rootScope, $mdSidenav) {

    $scope.nombreSeccion = ''
    $scope.rootScope = $rootScope;
    $scope.cargando = false
    $rootScope.cargando = false;
    $rootScope.$watch('cargando', function (){
      $scope.cargando = $rootScope.cargando
    })
    
    $scope.openMenu = function (){
   
       $mdSidenav('left').open()
    } 
    $scope.closeMenu = function (){
   
       $mdSidenav('left').close()
    }

})

angular.module('numfmt-error-module', [])

.run(function($rootScope) {
  $rootScope.typeOf = function(value) {
    return typeof value;
  };
})

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});



window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);