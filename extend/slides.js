/**
 * @file
 * Slid.es API connection through Kimono.
 */

var https = require('https');

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

      debugger;

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
}

// First time request.
update();

module.exports.getDecks = function () {
  return decks;
};

module.exports.getUser = function () {
  return user;
};
