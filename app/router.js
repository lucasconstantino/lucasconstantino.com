/**
 * ------------------------------------------------------------------------
 * Application Router
 * ------------------------------------------------------------------------
 * The main application router to serve rule based views.
 * Read more: https://github.com/angular-ui/ui-router/wiki
 */

angular.module(config.project.name)
  
  // Routing Configuration
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    // Configure states.
    $stateProvider

      // Define blog state.
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
      });

    // Register the interceptor.
    $httpProvider.interceptors.push('ghostRelativeUrlInterceptor');
  })

  // Ghost HTTP Interceptor
  .factory('ghostRelativeUrlInterceptor', function (AppConfig) {
    return {
      request: function (config) {
        if (!(/^https?:\/\//i).test(config.url)) {
          config.url = AppConfig.relativeUrl + config.url;
        }
        return config;
      }
    }
  });
