/**
 * ------------------------------------------------------------------------
 * Slides Router
 * ------------------------------------------------------------------------
 */

angular.module('slides')
  
  .config(function ($stateProvider  ) {
    
    $stateProvider

      // Slides main route.
      .state('talks', {
        url: '/talks',
        controller: 'DeckListController',
        templateUrl: 'views/slides/talks.html',
      })

      // Deck route.
      .state('talks.deck', {
        url: '/{slug}',
        resolve: {
          deck: function ($stateParams, decks) {
            return decks.filter(function (deck) {
              return deck.slug === $stateParams.slug;
            })[0] || {};
          }
        },
        modal: true,
        controller: 'DeckController',
        templateUrl: 'views/slides/deck.html'
      });
  });
