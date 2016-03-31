<!DOCTYPE html>
<html ng-app="adminApp">

  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">



    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic">
   <!--  <link rel="stylesheet" href="css/angular-material.min.css"> -->
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">
    <link rel="stylesheet" href="css/app.css">
  
  </head>

  <body layout="row" >

  <md-content layout="row" ng-controller='AppCtrl' class='viewport'>

     <md-sidenav class="site-sidenav md-sidenav-left nav"
              md-component-id="left"
              md-is-locked-open="$mdMedia('gt-sm')">

                    <div id='logo'>
                         <img src='../img/art.jpg' />
                    </div>

             <md-button ng-href="#/top" class='btnNav'  ng-click="closeMenu()"  >Canciones y Votos</md-button>
             <md-button ng-href="#/usuarios" class='btnNav'  ng-click="closeMenu()"  >Usuarios</md-button>


     </md-sidenav>

     <md-content layout="column" tabIndex="-1"  class='content'>

          <md-toolbar class="md-whiteframe-glow-z1 site-content-toolbar">

             <div class="md-toolbar-tools docs-toolbar-tools" ng-click="openMenu()" tabIndex="-1">

                 <md-button class="md-icon-button" hide-gt-sm aria-label="Toggle Menu">
                      <md-icon class='material-icons' aria-hidden="true">menu</md-icon>
                 </md-button>

                  <h2 class="md-toolbar-item md-breadcrumb md-headline">
                       {{rootScope.seccion}}
                  </h2>

                  <span flex></span>

             </div>

          </md-toolbar>

          <md-content ng-view md-scroll-y flex layout-padding></md-content>
      
      </md-content>

      <div id='cargando' ng-show=' cargando '>
           <md-progress-circular md-mode="indeterminate" value="..." role="progressbar"></md-progress-circular>
      </div>


    </md-content>

    <!-- Angular Material requires Angular.js Libraries -->
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-resource.min.js"></script>

    <!-- Angular Material Library -->
    <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>

   <script type="text/javascript" src="js/angular-sortable-view.min.js"></script>
   

    <script src="app/app.js"></script>
    <script src="app/ng-file-upload.min.js"></script>

    <script src="views/top.js"></script>


    


  </body>