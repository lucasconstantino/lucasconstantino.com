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

      // Blog main route.
      .state('blog', {
        url: '/blog',
        templateUrl: 'views/list.html',
      })

      // Blog post route.
      .state('blog.post', {
        url: '/{slug}',
        views: {
          '@': {
            templateUrl: 'views/post.html'
          }
        }
      })
  })

  .run(function ($rootScope, $document) {
    $rootScope.$on('$stateChangeStart', function () {
      $document.scrollTop(0, 500);
    });
  });
