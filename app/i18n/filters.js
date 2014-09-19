/**
 * ------------------------------------------------------------------------
 * i18n Module Filters
 * ------------------------------------------------------------------------
 */

angular.module('i18n')

  /**
   * Filter an array of objects by matching languages.
   */
  .filter('language', function (i18n) {
    return function (array, languages, attr) {
      if (!angular.isArray(array)) return array;

      attr = attr || 'language';
      languages = languages || i18n.current;

      // Arrays are more useful for this.
      if (!angular.isArray(languages)) languages = [languages];

      return array.filter(function (obj) {
        return !obj[attr] || languages.filter(function (language) {
          return i18n.matches(obj[attr], language, true);
        }) > -1;
      });
    };
  });
