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
        controller: 'BlogPostsController',
        templateUrl: 'views/blog/posts.html'
      })

      // Blog post route.
      .state('blog.post', {
        url: '/{slug}',
        resolve: {
          post: function ($stateParams, blogPosts) {
            return blogPosts.filter(function (post) {
              return post.slug == $stateParams.slug;
            })[0] || {};
          }
        },
        views: {
          '@': {
            controller: 'BlogPostController',
            templateUrl: 'views/blog/post.html'
          }
        }
      })
  });
