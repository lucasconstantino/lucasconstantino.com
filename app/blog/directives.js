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
          var wrapper = angular.element('<div />').html(html);
          element.append(wrapper);
          $compile(wrapper)(scope);
        });
      }
    }
  });
