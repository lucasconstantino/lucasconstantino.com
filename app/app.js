/**
 * ------------------------------------------------------------------------
 * Main Application Module
 * ------------------------------------------------------------------------
 * This script is the first dependency after requiring AngularJS. It
 * starts the main app module as well as requires other dependencies
 * that might be needed by application.
 */

window.disqus_shortname = 'lucasconstantino';

angular.module(config.project.name,
  
  // Application Dependencies
  [ 'ngRoute'
  , 'ngAnimate'
  , 'ui.router'
  , 'duScroll'
  , 'konami'
  , 'ngDisqus'
  , 'angular.filter'

  // Sub-modules
  , 'i18n'
  , 'blog'
  , 'slides'
  , 'development'
  ])

  // Application Constants
  .constant('AppConfig', config)

  // Application Start Event
  .run(function ($rootScope, $state, $stateParams, $location, $timeout) {

    var $body = $('body');

    // Give easy access to states on all modules via rootScope.
    $rootScope.state = $state.current;
    $rootScope.stateParams = $stateParams;

    // Record state changes.
    $rootScope.prevStates = [];

    // Track state changes.
    $rootScope.$on('$stateChangeSuccess', function (e, to, toParams, from, fromParams) {
      
      // Update current state info.
      $rootScope.state = to;
      $rootScope.stateParams = toParams;

      // Update state history.
      $rootScope.prevStates.push({
        state: from,
        params: fromParams,
        scroll: $body.scrollTop()
      });
    });
  })

  // Caching and loading.
  .run(function ($rootScope, $timeout) {

    // Force webkit redraw.
    document.body.style.webkitTransform = 'scale(1)';
    
    $timeout(function () {
      $rootScope.ready = true;
      document.body.style.webkitTransform = null;
    }, 500);
  });
