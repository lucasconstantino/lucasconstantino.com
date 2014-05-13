/**
 * ------------------------------------------------------------------------
 * Blog Controllers
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  .controller('BlogListController', function ($scope, blogPosts) {
    $scope.posts = blogPosts;
  });
