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
      'pt'    : 'br'
    , 'pt-BR' : 'br'
    , 'es'    : 'es'
    , 'en'    : 'gb'
    , 'en-US' : 'gb'
    };

    return function (language) {
      return map[language] || null;
    };
  });
