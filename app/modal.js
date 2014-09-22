/**
 * ------------------------------------------------------------------------
 * Modal Handlers
 * ------------------------------------------------------------------------
 */


angular.module(config.project.name)

  .provider('$modalState', function ($stateProvider) {
    var decorators = [
      'parent',
      'data',
      'url',
      'navigable',
      'params',
      'views',
      'ownParams',
      'path',
      'includes'
    ];

    this.$get = function ($state) {
      return {
        decorate: function (state) {
          state = angular.copy($state.get(state));
          if (decorate) {
            decorators.forEach(function (decorator) {
              state[decorator] = $stateProvider.decorator(decorator)(state);
            });
          }
          return state;
        }
      }
    };
  })

  // Modals.
  .run(function ($rootScope, $state, $compile, $controller, $injector, $timeout, $location, $modalState) {

    var $container = angular.element('.modal-container')
      , $body = angular.element('body')
      , scope;

    // Handle modal states entering.
    $rootScope.$on('$stateChangeStart', function (e, to, toParams, from, fromParams) {
      if (to.modal) {

        if (from.name) e.preventDefault();
      
        // Update current state info.
        $rootScope.state = to;
        $rootScope.stateParams = toParams;

        // Update state history.
        $rootScope.prevStates.push({
          state: from,
          params: fromParams,
          scroll: $body.scrollTop()
        });

        scope = $rootScope.$new();

        var html = '<div ng-include="\'' + to.templateUrl + '\'"></div>'
          , locals = {
            $stateParams: toParams,
            $state: to,
            $scope: scope
          };
        
        Object.keys(to.resolve || {}).forEach(function (name) {
          locals[name] = $injector.invoke(to.resolve[name], scope, locals);
        });

        $container.append(html);
        $compile($container.contents())(scope);

        if (to.controller) {
          $controller(to.controller, locals);
        }

        $timeout(function () {
          $rootScope.modal = true;
        });
      }
    });

    $rootScope.$on('$locationChangeStart', function (e) {
      if ($rootScope.modal) {
        $rootScope.closeModal();
      }
    });

    /**
     * Closes any opened modal.
     */
    $rootScope.closeModal = function (e) {

      var isModalContainer = e && e.target.classList.contains('modal-container')
        , isModal = e && e.target.parentNode.classList.contains('modal-container');

      if (this.modal && (isModalContainer || isModal || !e)) {
        $rootScope.modal = false;
        $timeout(function () {
          scope.$destroy();
          $container.html('');

          var to = $rootScope.prevStates[$rootScope.prevStates.length - 1];

          if (to.state.abstract) {
            to = $state.$current;

            // Recursively try to find nearest non-abstract parent.
            var found = false;
            while (to.parent) {
              if (!to.parent.self.abstract) {
                found = true;
                $state.go(to.parent.self);
              }

              to = to.parent;
            }

            // Move home :(
            if (!found) $location.url('/');
          } else {
            $state.go(to.state, to.params);
          }

          setTimeout(function () {
            $body.scrollTop(to.scroll || 0);
          }, 10);
        }, 400);
      }
    };
  });
