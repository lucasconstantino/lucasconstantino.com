/**
 * @file
 * i18n language loader.
 */

module.exports = require('require-dir')('../i18n');

Object.keys(module.exports).forEach(function (code) {
  module.exports[code].code = code;
});
