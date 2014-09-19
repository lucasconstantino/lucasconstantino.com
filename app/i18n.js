/**
 * ------------------------------------------------------------------------
 * Application i18n Configuration
 * ------------------------------------------------------------------------
 */

angular.module(config.project.name)

  // Read translatable strings and register them for Angular.
  .provider('i18n', function ($translateProvider) {

    var userLang = (navigator.language || navigator.userLanguage)
      , translations = config.i18n || {};

    userLang = !translations[userLang] ? 'en' : userLang;

    // Register translations.
    Object.keys(translations).forEach(function (lang) {
      $translateProvider.translations(lang, translations[lang].phrases);
    });

    $translateProvider.preferredLanguage(userLang);

    this.$get = function ($rootScope, $translate) {

      // Prepare factory.
      var i18n = {
        current: $translate.use(),
        languages: translations
      };

      $rootScope.$on('$translateChangeEnd', function () {
        i18n.current = $translate.use();
      });

      // Return factory.
      return i18n;
    };
  })

  .config(function ($stateProvider) {
    $stateProvider.state('home.language', {
      url: '/language',
      modal: true,
      views: {
        'modal@': {
          controller: 'LanguageController',
          templateUrl: 'views/i18n.html',
        }
      }
    });
  })

  .controller('LanguageController', function ($scope, $translate, i18n) {
    $scope.selected = $translate.use();
    $scope.languages = i18n.languages;

    $scope.setLanguage = function (code) {
      $scope.selected = code;
      $translate.use(code);
    };
  });
