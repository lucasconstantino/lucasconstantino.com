7/**
 * ------------------------------------------------------------------------
 * Blog Router
 * ------------------------------------------------------------------------
 */

angular.module('blog')

  .config(function ($stateProvider) {
    
    $stateProvider

      // Blog main route.
      .state('blog', {
        url: '/blog',
        templateUrl: 'views/blog-posts.html',
      })

      // Blog post route.
      .state('blog.post', {
        url: '/{slug}',
        views: {
          '@': {
            templateUrl: 'views/blog-post.html'
          }
        }
      })
  });
