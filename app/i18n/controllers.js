/**
 * ------------------------------------------------------------------------
 * i18n Module Controllers
 * ------------------------------------------------------------------------
 */

angular.module('i18n')

  /**
   * Controls language settings selection.
   */
  .controller('LanguageController', function ($scope, $cookies, $translate, i18n) {
    $scope.selected = i18n.current.code;
    $scope.languages = i18n.languages;
    $scope.filter = i18n.filter;

    $scope.setLanguage = function (code) {
      $scope.selected = code;
      $translate.use(code);
    };

    $scope.setFiltering = function () {
      $scope.filter
        = $cookies.languageFilter
        = i18n.filter
        = !i18n.filter;
    };
  });
