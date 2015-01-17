/**
 * @file
 * Preprocess function and caching results for posts.
 */

var guessLanguage = require('guesslanguage').guessLanguage
  , postTranslations = {};

module.exports = function (post) {

  // Performance boost by using cache.
  // @todo: develop a clear caching method.
  if (postTranslations[post.published_at]) {

    // Inform related translations, when available.
    post.translations = postTranslations[post.published_at];

    var postLanguage = null;

    // Discover this post's language.
    Object.keys(post.translations).forEach(function (language) {
      if (post.translations[language] == post.id) postLanguage = language;
    });

    // Early return in case we fund our language.
    if (postLanguage) return post.language = postLanguage;
  }

  guessLanguage.detect(post.markdown, function (language) {
    if (language) {
      postTranslations[post.published_at] = postTranslations[post.published_at] || {};
      postTranslations[post.published_at][language] = post.id;
    }
  });
};
