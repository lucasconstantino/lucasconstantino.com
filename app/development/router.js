/**
 * ------------------------------------------------------------------------
 * Development Router
 * ------------------------------------------------------------------------
 */

angular.module('development')
  
  .config(function ($stateProvider  ) {
    
    $stateProvider
      .state('development', {
        url: '/development',
        controller: 'DevelopmentController',
        templateUrl: 'views/development.html',
      });
  });
