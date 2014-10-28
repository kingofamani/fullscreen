(function() {
  'use strict';
  angular.module('app', [

    'ngRoute',

    'app.keyboard.factory',

    'app.my.ctrl',
    'app.my.service'

    ])

  .config(['$routeProvider','$locationProvider', '$httpProvider' , 
    function($routeProvider,$locationProvider,$httpProvider) {

      return $routeProvider

      .when('/',{
        templateUrl: 'news.html'
      })
      .when('/news',{
        templateUrl: 'news.html'
      })
      .when('/admin',{
        templateUrl: 'admin.html'
      })

      $routeProvider.otherwise({redirectTo:'/'});

    }//config
  ])
  .run(function($rootScope,$sce,MySvc){
    console.log('run');

        
  })

  .directive('onLastRepeat', function() {
      return function(scope, element, attrs) {
          if (scope.$last) setTimeout(function(){
              scope.$emit('onRepeatLast', element, attrs);
          }, 1);
      };
  })

  


}).call(this);


