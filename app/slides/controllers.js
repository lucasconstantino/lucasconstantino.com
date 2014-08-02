/**
 * ------------------------------------------------------------------------
 * Slides Controllers
 * ------------------------------------------------------------------------
 */

angular.module('slides')
  
  // Slide deck list.
  .controller('DeckListController', function ($scope, decks) {
    $scope.decks = decks;
  })
  
  // Single slide deck.
  .controller('DeckController', function ($scope, deck) {
    $scope.deck = deck;
  });
