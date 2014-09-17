/**
 * @file
 * Custom Ghost Extension.
 */

var rootPath  = '../../../../'
  , config    = require(rootPath + 'core/server/config')
  , hbs       = require('express-hbs')
  , path      = require('path')
  , fs        = require('fs')
  , _         = require('lodash')
  , walk      = require('walk')
  , project   = require('../package.json')
  , themePath = path.normalize(__dirname + '/../')
  , slides    = require('./slides')
  , i18n      = require('./i18n');

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
  var config = this;

  // Guard blog settings, if available.
  if (context && context.data && context.data.blog) {
    config.blog = context.data.blog;
  }

  // Join other information.
  _.assign(config, {
    project: project
  , slides: {
      decks: slides.getDecks()
    , user: slides.getUser()
    }
  , i18n: i18n
  });

  return safeString(JSON.stringify(config));
});

/**
 * Angular templates cache helper.
 */
hbs.registerHelper('views', function (options) {
  
  var viewsPath = path.normalize(__dirname + '/../views')
    , result    = '';

  // Walk views recursively.
  walk.walkSync(viewsPath, {
    followLinks: false
  , listeners: {
      file: function (root, file, next) {
        result += options.fn({
          path: root.replace(themePath, '/') + '/' + file.name,
          markup: fs.readFileSync(root + '/' + file.name, 'utf8')
        });
      }
    }
  });

  return result;
});


// --------------------------
// Include helpers.
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
 * Handles the inclusion of JavaScript and Stylesheet assets.
 */
function include(type, context, options) {
  var output    = ''
    , basePath  = config.paths.subdir
    , assetPath = basePath + '/' + (type ? type + '/' : '')
    , renderer  = {
      '.js': function (filepath, attributes) {
        return safeString(renderTag({
          tag: 'script'
        , attr: _.assign({
                  src: filepath
                }, attributes)
        }));
      }
    , '.css': function (filepath, attributes) {
        return safeString(renderTag({
          tag: 'link'
        , closure: false
        , attr: _.assign({
                  href: filepath
                , rel: 'stylesheet'
                }, attributes)
        }));
      }
    };

  // Parse settings.
  options = options && options.hash || false;
  context = options ? context : false;

  // Return basic path if data isn't as expected.
  if (typeof context != 'string' || typeof options != 'object') return assetPath;

  if (renderer[path.extname(context)]) {
    return renderer[path.extname(context)](assetPath + context, options);
  } else {
    var log = 'Could not include "' + context + '": the extension is absent or is not supported.';
    console.log(log);
    return safeString('<!-- ' + log + ' -->');
  }
}

// Map include types.
var map = {
      'component' : 'components'
    , 'app'       : 'app'
    , 'include'   : ''
    }
  , m;

// Register each type and path.
for (m in map) {
  (function (key) {
    hbs.registerHelper(key, function (context, options) {
      return include(map[key], context, options);
    });
  })(m);
}
