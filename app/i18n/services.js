/**
 * ------------------------------------------------------------------------
 * i18n Module Services
 * ------------------------------------------------------------------------
 */

angular.module('i18n')

  // Read translatable strings and register them for Angular.
  .provider('i18n', function ($translateProvider) {

    var userLanguage = (navigator.language || navigator.userLanguage)
      , translations = config.i18n || {};

    userLanguage = !translations[userLanguage] ? 'en' : userLanguage;

    // Register translations.
    Object.keys(translations).forEach(function (lang) {
      $translateProvider.translations(lang, translations[lang].phrases);
    });

    $translateProvider.preferredLanguage(userLanguage);

    this.$get = function ($rootScope, $translate) {

      // Prepare factory.
      var i18n = {
        current: $translate.use(),
        languages: translations
      };

      $rootScope.$on('$translateChangeEnd', function () {
        i18n.current = $translate.use();
      });

      /**
       * Verify if languages as relative.
       */
      i18n.relative = function (fromLanguage, toLanguage) {
        return fromLanguage.replace(/-.*/, '') === toLanguage.replace(/-.*/, '');
      };

      /**
       * Verify if language matches a set.
       */
      i18n.matches = function (language, languages, ease) {
        ease = ease || false;
        languages = languages || [i18n.current];

        return languages.filter(function (filterLanguage) {
          return language === filterLanguage || (ease && i18n.relative(language, filterLanguage));
        }) > -1;
      };

      // Return factory.
      return i18n;
    };
  });
