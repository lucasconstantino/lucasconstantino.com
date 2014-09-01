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
  .controller('DeckController', function ($scope, $sce, deck) {
    $scope.deck = deck;

    // iFrame src.
    $scope.embedUrl = $sce.trustAsResourceUrl(deck.url + '/embed?style=ligth');
  });
