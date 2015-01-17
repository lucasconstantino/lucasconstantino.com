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
  .controller('BlogPostController', function ($scope, post) {
    $scope.post = post
  });
