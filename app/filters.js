/**
 * ------------------------------------------------------------------------
 * Application-wide Filter
 * ------------------------------------------------------------------------
 */

angular.module(config.project.name)

  /**
   * Country language mapping.
   */
  .filter('country', function () {

    var map = {
      'pt': 'br'
    , 'es': 'es'
    , 'en': 'gb'
    };

    return function (lang) {
      return map[lang] || null;
    };
  });
