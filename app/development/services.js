/**
 * ------------------------------------------------------------------------
 * Development Services
 * ------------------------------------------------------------------------
 */

angular.module('development')
  
  .service('dependencies', function (AppConfig) {
    this.node = AppConfig['package.json'].dependencies || {};
    this.bower = AppConfig['bower.json'].dependencies || {};
  });
