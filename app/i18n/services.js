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
        filter: true,
        languages: translations
      };

      /**
       * Reset current language status.
       * @return {[type]} [description]
       */
      function resetLanguage() {
        i18n.current = translations[$translate.use()] || translations['en'] || translations[0];
        $rootScope.language = i18n.current;
      }

      resetLanguage();
      $rootScope.$on('$translateChangeEnd', resetLanguage);

      /**
       * Verify if languages as relative.
       */
      i18n.relative = function (fromLanguage, toLanguage) {
        return fromLanguage.replace(/[_-].*/, '') === toLanguage.replace(/[_-].*/, '');
      };

      /**
       * Verify if language matches a set.
       */
      i18n.matches = function (language, languages, ease) {
        ease = ease || false;
        languages = languages || [i18n.current.code];

        return !!languages.filter(function (filterLanguage) {
          return language === filterLanguage || (ease && i18n.relative(language, filterLanguage));
        }).length;
      };

      // Return factory.
      return i18n;
    };
  });
