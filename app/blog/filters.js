/**
 * ------------------------------------------------------------------------
 * Blog Filters
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  
  // Basic filter to trust a content as safe HTML.
  .filter('html', function ($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    }
  })

  // Creates a excerpt from a post content.
  .filter('excerpt', function () {
    return function (input) {
      var body      = $(input),
          featured  = body.filter('.featured'),
          firstText = body.filter('p:first-child');

      return $('<div />').append(featured.length ? featured : firstText).html() || '';
    }
  })

  // Filter posts by tag
  .filter('hasTag', function () {
    return function (input, tag) {

      // Early return if not tag given.
      if (!tag) return input;
      
      // Handle boolean request for single post.
      if (!angular.isArray(input)) return (input.tags || []).filter(function (tagObject) {
        return tagObject && tagObject.slug && tagObject.slug == tag;
      }).length > 0;

      return (angular.isArray(input) ? input : []).filter(function (post) {
        return (post.tags || []).filter(function (tagObject) {
          return tagObject && tagObject.slug && tagObject.slug == tag;
        }).length > 0;
      });
    }
  });
