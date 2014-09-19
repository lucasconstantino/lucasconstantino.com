/**
 * ------------------------------------------------------------------------
 * i18n Module Controllers
 * ------------------------------------------------------------------------
 */

angular.module('i18n')

  /**
   * Controls language settings selection.
   */
  .controller('LanguageController', function ($scope, $translate, i18n) {
    $scope.selected = i18n.current;
    $scope.languages = i18n.languages;

    $scope.setLanguage = function (code) {
      $scope.selected = code;
      $translate.use(code);
    };
  });
