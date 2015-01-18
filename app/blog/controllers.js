/**
 * ------------------------------------------------------------------------
 * Blog Controllers
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  // Blog list.
  .controller('BlogPostsController', function ($scope, $stateParams, blogPosts) {
    $scope.posts = blogPosts;
    $scope.tag = $stateParams.tag;
  })
  
  // Blog post.
  .controller('BlogPostController', function ($scope, post, blogPosts, i18n) {
    $scope.post = post
    $scope.translation = null;

    // Fullfil translation suggestion when available:
    $scope.$watch('language', function (language) {

      if (post.language && i18n.matches(post.language, null, true)) return $scope.translation = null;

      // Find translated post, if available.
      for (var language in post.translations) {
        if (i18n.matches(language, null, true)) {
          return $scope.translation = blogPosts.findById(post.translations[language]);
        }
      }

      // If none found, make sure to reset value.
      $scope.translation = null;
    });
  });
