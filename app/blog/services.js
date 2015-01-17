/**
 * ------------------------------------------------------------------------
 * Blog Services
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  .factory('blogPosts', function (AppConfig) {
    return (AppConfig.posts || []).map(function (post) {

      // Transform date string into Date objects.
      post.date = new Date(post['published_at']);

      // Transform language setting.
      if (post.language) post.language = post.language.replace('_', '-');

      // Map post itself.
      return post;
    });
  });
