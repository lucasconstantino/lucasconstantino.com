/**
 * ------------------------------------------------------------------------
 * Blog Controllers
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  // Blog list.
  .controller('BlogPostsController', function ($scope, blogPosts) {
    $scope.posts = blogPosts;
  })
  
  // Blog post.
  .controller('BlogPostController', function ($scope, post) {
    $scope.post = post
  });
