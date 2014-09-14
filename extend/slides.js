/**
 * @file
 * Slid.es API connection through Kimono.
 */

var https = require('https')
  , request = require('request')
  , couleur = require('couleur')
  , jQuery = require('jquery')
  , jsdom = require('jsdom')
  , language = require('guesslanguage').guessLanguage;

// Configuration.
var frequency = 86400000 // daily.
  , host      = 'www.kimonolabs.com'
  , apiPath   = 'api'
  , apiId     = '6pn9lvsc'
  , decks     = []
  , user      = {}
  , query     = {
      apiKey: 'd10e17f0804a00aeb4ce6f8ef05083f0'
    , kimpath1: 'lucasconstantinosilva'
    }
  , options   = {
      host: host,
      path: '/' + apiPath + '/' + apiId + '?' + Object.keys(query).map(function (key) {
        return key.toLowerCase() + '=' + query[key];
      }).join('&')
    }


/**
 * Update decks data.
 */
function update() {
  https.request(options, function (response) {
    var data = ''
      , parsed;

    // Listen for chunks of data.
    response.on('data', function (chunk) {
      data += chunk;
    });

    // Listen for response end.
    response.on('end', function () {
      parsed = JSON.parse(data);
      decks  = parsed && parsed.results && parsed.results.decks || [];
      user   = parsed && parsed.results && parsed.results.user && parsed.results.user[0] || {};

      // Clean deck data.
      decks.forEach(cleanDeck);

      // Schedule next update.
      setTimeout(update, frequency);
    });
  }).end();
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

  // Parse publishing data.
  var publishedRegex = /Published ([a-zA-z]{3}) ([0-9]{1,2}).*?, ([0-9]*)$/;
  var publishedSplit = deck.published.match(publishedRegex);

  var month = publishedSplit[1];
  var day   = publishedSplit[2];
  var year  = publishedSplit[3];

  deck.published = new Date(month + ' ' + day + ', ' + year);

  findDominantColor(deck);
  findDominantLanguage(deck);
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
 * Parses deck main language.
 */
function findDominantLanguage(deck) {
  if (deck.url) {
    request(deck.url, function (err, res, body) {
      if (body) {
        jsdom.env(body, function (err, window) {
          if (window) {
            language.detect(jQuery(window)('.slides').text(), function (lang) {
              if (lang) {
                deck.lang = lang;
              }
            });
          }
        });
      }
    });
  }
}

// First time request.
update();

module.exports.getDecks = function () {
  return decks;
};

module.exports.getUser = function () {
  return user;
};
