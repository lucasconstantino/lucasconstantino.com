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

    this.$get = function ($rootScope, $localStorage, $translate) {

      var userLanguage = navigator.language || navigator.userLanguage;

      $localStorage.i18n = $localStorage.i18n || {
        filter: true,
        language: !translations[userLanguage] ? 'en' : userLanguage
      };

      // Prepare factory.
      var factory = {
        current: {},
        languages: translations
      };

      /**
       * Reset current language status.
       * @return {[type]} [description]
       */
      function resetLanguage() {
        factory.current = translations[$translate.use()] || translations.en || translations[0];
        $rootScope.language = factory.current;
        $localStorage.i18n.language = factory.current.code;
      }

      /**
       * Verify if languages as relative.
       */
      factory.relative = function (fromLanguage, toLanguage) {
        return fromLanguage.replace(/[_-].*/, '') === toLanguage.replace(/[_-].*/, '');
      };

      /**
       * Verify if language matches a set.
       */
      factory.matches = function (language, languages, ease) {
        ease = ease || false;
        languages = languages || [factory.current.code];

        return !!languages.filter(function (filterLanguage) {
          return language === filterLanguage || (ease && factory.relative(language, filterLanguage));
        }).length;
      };

      $translate.preferredLanguage($localStorage.i18n.language);
      $rootScope.$on('$translateChangeEnd', resetLanguage);
      $translate.use($localStorage.i18n.language);

      // Return factory.
      return factory;
    };
  })

  // Force loading of service.
  .run(function (i18n) {});
