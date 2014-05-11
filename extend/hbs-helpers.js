/**
 * @file
 * Custom Handlebars helpers.
 */

var rootPath  = '../../../../'
  , config    = require(rootPath + 'core/server/config')
  , hbs       = require('express-hbs')
  , path      = require('path')
  , fs        = require('fs')
  , _         = require('lodash');

// Templates.
var hbsTag = hbs.compile(fs.readFileSync(__dirname + '/templates/tag.hbs', 'utf8'));


// --------------------------
// Helper functions.
// --------------------------

/**
 * Alias for the SafeString method.
 */
function safeString(string) {
  return new hbs.handlebars.SafeString(string);
}


// --------------------------
// Handlebars helpers.
// --------------------------

/**
 * JSON Stringify helper.
 */
hbs.registerHelper('json', function (context) {
  return safeString(JSON.stringify(context));
});

/**
 * Configuration exporter.
 */
hbs.registerHelper('config', function (context) {

  // Safely parse context.
  var config = typeof this == 'object' ? this : {
    data: context
  };

  // Guard blog settings, if available.
  if (context && context.data && context.data.blog) {
    config.blog = context.data.blog;
  }

  return safeString(JSON.stringify(config));
});


// --------------------------
// Asset helpers.
// --------------------------

/**
 * Default setter for rendering a generic tag.
 */
function renderTag(options) {
  return hbsTag(_.assign({
    children: false
  , closure: true
  }, options));
}

/**
 * Handles the printing of JavaScript and Stylesheet assets.
 */
function requireAsset(type, context, options) {
  var output    = ''
    , basePath  = config().paths.subdir
    , assetPath = basePath + '/' + (type ? type + '/' : '')
    , renderer  = {
      '.js': function (filepath, attributes) {
        return safeString(renderTag({
          tag: 'script'
        , attr: _.assign({ src: filepath }, attributes)
        }));
      }
    , '.css': function (filepath, attributes) {
        return safeString(hbsScript(_.assign({
          href: filepath
        }, attributes, {
          rel: 'stylesheet'
        })));
      }
    };

  // Parse settings.
  options = options && options.hash || false;
  context = options ? context : false;

  // Return basic path if data isn't as expected.
  if (typeof context != 'string' || typeof options != 'object') return assetPath;

  return renderer[path.extname(context)] && renderer[path.extname(context)](assetPath + context, options) || '';
}

// Register asset types
['components', 'app', 'assets'].forEach(function (type) {
  hbs.registerHelper(type.replace(/s+$/, ""), function (context, options) {
    return requireAsset(type, context, options);
  });
});
