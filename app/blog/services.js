/**
 * ------------------------------------------------------------------------
 * Blog Services
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  .factory('blogPosts', function (AppConfig) {
    return (AppConfig.posts || []).filter(function (post) {
      post.date = new Date(post.created_at);
      return true;
    });
  });
