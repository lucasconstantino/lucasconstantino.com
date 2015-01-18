/**
 * ------------------------------------------------------------------------
 * Blog Services
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  .factory('blogPosts', function (AppConfig) {

    // Basic array.
    var blogPosts = (AppConfig.posts || []).map(function (post) {

      // Transform date string into Date objects.
      post.date = new Date(post['published_at']);

      // Transform language setting.
      if (post.language) post.language = post.language.replace('_', '-');

      // Map post itself.
      return post;
    });

    /**
     * Retrieves a post by it's id or null if not found.
     */
    blogPosts.findById = function (id) {
      return this.filter(function (post) {
        return post.id == id;
      })[0] || null;
    };

    return blogPosts;
  });
