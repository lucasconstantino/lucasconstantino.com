/**
 * ------------------------------------------------------------------------
 * Application-wide Directives
 * ------------------------------------------------------------------------
 * Directives that did not find a better place to live :)
 */

angular.module(config.project.name)

/**
 * Scroll Spy
 */
.directive("scrollSpy", function ($rootScope, $window, $timeout) {

  /**
   * Scroll listener.
   */
  function scrollListener() {
    var scrollY = this.scrollY
      , center = $window.innerHeight / 2 + $window.scrollY
      , newViewing = currentlySpying.filter(function (spying) {
        var offset = spying.$element.offset();
        if (offset.top - scrollY < center && offset.top + spying.element.offsetHeight > center) {
          return true;
        }
      })[0] || null;

    if (currentlyViewing !== newViewing) {
      $rootScope.$apply(function () {
        currentlyViewing && currentlyViewing.$element.removeClass('active-view');
        currentlyViewing = newViewing;
        currentlyViewing && currentlyViewing.$element.addClass('active-view');
        $rootScope.viewing = currentlyViewing && currentlyViewing.value || '';
      });
    }
  }

  var currentlySpying = []
    , currentlyViewing = null
    , startSpying = function () {
      var el = angular.element($window);
      el.on('scroll', scrollListener);
      setTimeout(el.trigger.bind(el, 'scroll'));
    };

  return {
    link: function ($scope, $element, $attr) {
      currentlySpying.push({
        $element: $element,
        element: $element[0],
        value: $attr.scrollSpy
      });

      if (currentlySpying.length == 1) startSpying();
    }
  };
});