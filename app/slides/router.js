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
      .state('talks.talk', {
        url: '/{slug}',
        resolve: {
          deck: function ($stateParams, decks) {
            return decks.filter(function (deck) {
              return deck.slug == $stateParams.slug;
            })[0] || {};
          }
        },
        views: {
          'talk-modal': {
            controller: 'TalkController',
            templateUrl: 'views/slides/talk.html'
          }
        }
      })
  });
