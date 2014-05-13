/**
 * ------------------------------------------------------------------------
 * Blog Router
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    // Make Blog the default route.
    $urlRouterProvider.otherwise('/blog');

    $stateProvider
      .state('blog', {
        url: '/blog',
        templateUrl: 'app/blog/views/list.html',
      });
  });
