/**
 * ------------------------------------------------------------------------
 * Slides Services
 * ------------------------------------------------------------------------
 */

angular.module('slides')
  
  .factory('decks', function (AppConfig) {

    return (AppConfig.slides.decks || []).map(function (deck) {

      // Transform date string into Date objects.
      deck.published = new Date(deck.published);

      deck.colorRGB = deck.color && ('rgb(' + deck.color.join(',') + ')');

      return deck;
    });
  });
