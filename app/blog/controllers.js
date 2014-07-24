/**
 * ------------------------------------------------------------------------
 * Blog Controllers
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  // Blog list.
  .controller('BlogListController', function ($scope, blogPosts) {
    $scope.posts = blogPosts;
  })
  
  // Blog post.
  .controller('BlogPostController', function ($scope, $stateParams, blogPosts) {
    $scope.post = blogPosts.filter(function (post) {
      return post.slug == $stateParams.slug;
    })[0] || {};
  });
