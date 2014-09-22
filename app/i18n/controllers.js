/**
 * ------------------------------------------------------------------------
 * i18n Module Controllers
 * ------------------------------------------------------------------------
 */

angular.module('i18n')

  /**
   * Controls language settings selection.
   */
  .controller('LanguageController', function ($scope, $localStorage, $translate, i18n) {
    $scope.selected = i18n.current.code;
    $scope.languages = i18n.languages;
    $scope.filter = $localStorage.i18n.filter;

    $scope.setLanguage = function (code) {
      $scope.selected = code;
      $translate.use(code);
    };

    $scope.setFiltering = function () {
      $scope.filter = $localStorage.i18n.filter = !$localStorage.i18n.filter;
    };
  });
