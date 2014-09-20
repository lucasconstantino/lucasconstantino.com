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

    this.$get = function ($rootScope, $cookies, $translate) {

      userLanguage = translations[$cookies.language] && $cookies.language || userLanguage;

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
        i18n.current = translations[$translate.use()] || translations.en || translations[0];
        $rootScope.language = i18n.current;
        $cookies.language = i18n.current.code;
      }

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

      $translate.use(userLanguage);
      $translate.preferredLanguage(userLanguage);

      resetLanguage();
      $rootScope.$on('$translateChangeEnd', resetLanguage);

      // Return factory.
      return i18n;
    };
  });
