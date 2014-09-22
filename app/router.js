/**
 * ------------------------------------------------------------------------
 * Application Router
 * ------------------------------------------------------------------------
 * The main application router to serve rule based views.
 * Read more: https://github.com/angular-ui/ui-router/wiki
 */

angular.module(config.project.name)
  
  // Routing Configuration
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
      })

      .state('language', {
        url: 'language',
        modal: true,
        controller: 'LanguageController',
        templateUrl: 'views/i18n.html'
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
  })

  // Scroll effect.
  .run(function ($rootScope) {

    var $body = $('body');

    // @todo: limit transition for when main view is changed only.
    $rootScope.$on('$stateChangeStart', function (e, to, toParam, from, fromParam) {
      if (from.name && $body.scrollTop() && (!to.modal && !from.modal)) {
        setTimeout(function () {
          $body.animate({
            scrollTop: 0
          }, 500, 'easeOutExpo');
        }, 10);
      }
    });
  });
