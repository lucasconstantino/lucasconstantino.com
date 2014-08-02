/**
 * ------------------------------------------------------------------------
 * Main Application Module
 * ------------------------------------------------------------------------
 * This script is the first dependency after requiring AngularJS. It
 * starts the main app module as well as requires other dependencies
 * that might be needed by application.
 */

angular.module(config.project.name,
  
  // Application Dependencies
  [ 'ngRoute'
  , 'ngAnimate'
  , 'ui.router'
  , 'duScroll'
  , 'ng-prism'

  // Sub-modules
  , 'blog'
  , 'slides'
  ])

  // Application Constants
  .constant('AppConfig', config)

  // Application Start Event
  .run(function ($rootScope, $state, $stateParams) {

    // Give easy access to states on all modules via rootScope.
    $rootScope.$state = $rootScope.$prevState = $state;
    $rootScope.$stateParams = $rootScope.$prevStateParams = $stateParams;

    // Track state changes.
    $rootScope.$on('$stateChangeSuccess', function (e, to, toParams, from, fromParams) {
      
      // Update previous state info.
      $rootScope.$prevState = to;
      $rootScope.$prevStateParams = toParams;
    });
  });
