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
          element.find('img').parent('p').addClass('has-image');
          $compile(wrapper)(scope);
        });
      }
    }
  });
