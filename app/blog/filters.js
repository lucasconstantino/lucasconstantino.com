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
  });
