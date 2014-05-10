/**
 * Custom Handlebars helpers.
 */

var hbs = require('express-hbs');

/**
 * JSON Stringify helper.
 */
hbs.registerHelper('json', function(context) {
  return new hbs.handlebars.SafeString(JSON.stringify(context));
});
