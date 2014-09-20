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

      // Handle modals.
      // @todo: handle child modal states.
      if (to.views && to.modal) {
        $timeout(function () {
          $rootScope.modal = true;
        });
      } else {
        $rootScope.modal = false;
      }
    });

    /**
     * Closes any opened modal.
     */
    $rootScope.closeModal = function (e) {

      var isModalContainer = e && e.target.classList.contains('modal-container')
        , isModal = e && e.target.parentNode.classList.contains('modal-container');

      if (this.modal && (isModalContainer || isModal)) {
        $rootScope.modal = false;
        $timeout(function () {
          var to = $rootScope.prevStates[$rootScope.prevStates.length - 1];

          if (to.state.abstract) {
            to = $state.$current;

            // Recursively try to find nearest non-abstract parent.
            while (to.parent) {
              if (!to.parent.self.abstract) {
                $state.go(to.parent.self);
              }

              to = to.parent;
            }

            // Move home :(
            $location.url('/');
          } else {
            $state.go(to.state, to.params);
          }

          setTimeout(function () {
            $body.scrollTop(to.scroll || 0);
          }, 10);
        }, 400);
      }
    };

    $timeout(function () {
      $rootScope.ready = true;
    });
  });
