/**
 * ------------------------------------------------------------------------
 * Blog Services
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  .factory('blogPosts', function (AppConfig) {
    return (AppConfig.posts || []).map(function (post) {

      // Transform date string into Date objects.
      post.date = new Date(post.created_at);

      // Map post itself.
      return post;
    });
  });
