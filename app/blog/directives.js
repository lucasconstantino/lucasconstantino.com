/**
 * ------------------------------------------------------------------------
 * Blog Directives
 * ------------------------------------------------------------------------
 */

angular.module('blog')
  .directive('postHtml', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, element, attrs) {
        scope.$watch('post.html', function (html) {
          element.html(html);
          $compile(element.contents())(scope);
        });
      }
    }
  });
