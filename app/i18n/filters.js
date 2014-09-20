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
      if (!angular.isArray(array) || !i18n.filter) return array;

      attr = attr || 'language';
      languages = languages || i18n.current.code;

      // Arrays are more useful for this.
      if (!angular.isArray(languages)) languages = [languages];

      return array.filter(function (obj) {
        return !obj[attr] || i18n.matches(obj[attr], languages, true);
      });
    };
  });
