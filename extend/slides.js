/**
 * @file
 * Slid.es API connection through Kimono.
 */

var https = require('https')
  , request = require('request')
  , couleur = require('couleur')
  , jQuery = require('jquery')
  , jsdom = require('jsdom')
  , guessLanguage = require('guesslanguage').guessLanguage;

// Configuration.
var frequency = 86400000 // daily.
  , host      = 'http://slides.com'
  , username  = 'lucasconstantinosilva'
  , decks     = []
  , user      = {}
  , apiUrl    = host + '/' + username;


/**
 * Parses deck main language.
 */
function findDominantLanguage(deck) {
  if (deck.url) {
    request(deck.url, function (err, res, body) {
      if (body) {
        jsdom.env(body, function (err, window) {
          if (window) {
            guessLanguage.detect(jQuery(window)('.slides').text(), function (language) {
              if (language) {
                deck.language = language;
              }
            });
          }
        });
      }
    });
  }
}

/**
 * Parses a deck image to find the dominant color.
 */
function findDominantColor(deck) {
  var data
    , pos = 0;

  if (deck.image) {
    https.get(deck.image, function (res) {
      data = new Buffer(parseInt(res.headers['content-length'], 10));

      res.on('data', function (chunk) {
        chunk.copy(data, pos);
        pos += chunk.length;
      });

      res.on('end', function () {
        couleur.getColor(data, 1, function (err, color) {
          if (!err) {
            deck.color = color;
          }
        });
      });
    });
  }
}

/**
 * Clean deck data.
 */
function cleanDeck(deck) {

  // Keep only url.
  deck.image = deck.image.replace('background-image: url(', '').replace(')', '');

  // Parse number values.
  deck.likes = parseInt(0 + deck.likes);
  deck.views = parseInt(0 + deck.views);

  deck.published = new Date(deck.published);

  findDominantColor(deck);
  findDominantLanguage(deck);
}

/**
 * Update decks data.
 */
function update() {

  // Clear values.
  decks = [];
  user = {};

  request(apiUrl, function (err, res, body) {
    if (body) {
      jsdom.env(body, function (err, window) {
        if (window) {
          var $ = jQuery(window)
            , $decks = $('.decks .deck')
            , $user = $('.user-info');

          $decks.each(function () {
            var $deck = $(this);

            decks.push({
              title: $deck.find('.deck-title .deck-title-value').text().trim()
            , published: $deck.find('.deck-metadata .status time').attr('datetime')
            , views: $deck.find('.deck-metadata .views').text().trim()
            , likes: parseInt($deck.find('.deck-metadata .kudos').text().trim())
            , image: $deck.find('.deck-image').css('background-image')
              .replace('url(', '')
              .replace(')', '')
              .trim()
            , url: host + $deck.attr('data-url')
            , id: $deck.attr('data-id')
            , slug: $deck.attr('data-slug')
            , visibility: $deck.is('.public')
            });
          });

          user = {
            name: $user.find('.username').text().trim()
          , badge: $user.find('.picture').css('background-image')
            .replace('url(', '')
            .replace(')', '')
            .trim()
          , url: host + $user.find('.username').attr('href')
          };

          // Clean deck data.
          decks.forEach(cleanDeck);

          // Schedule next update.
          setTimeout(update, frequency);
        }
      });
    }
  });
}

// First time request.
update();

module.exports.getDecks = function () {
  return decks;
};

module.exports.getUser = function () {
  return user;
};
