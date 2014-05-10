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

/**
 * Configuration exporter.
 */
hbs.registerHelper('config', function(context) {

  // Safely parse context.
  var config = typeof this == 'object' ? this : {
    data: context
  };

  // Guard blog settings, if available.
  if (context && context.data && context.data.blog) {
    config.blog = context.data.blog;
  }

  return new hbs.handlebars.SafeString(JSON.stringify(config));
});
