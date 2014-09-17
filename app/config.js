/**
 * ------------------------------------------------------------------------
 * Application Configuration
 * ------------------------------------------------------------------------
 */

angular.module(config.project.name)

  // Read translatable strings and register them for Angular.
  .config(function ($translateProvider, $interpolateProvider) {

    var userLang = (navigator.language || navigator.userLanguage || 'en').replace(/-.*/, '')
      , translations = config.i18n || {};

    Object.keys(translations).forEach(function (lang) {
      $translateProvider.translations(lang, translations[lang]);
    });

    $translateProvider.preferredLanguage('pt');
  });
