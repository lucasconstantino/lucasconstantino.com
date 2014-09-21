/**
 * ------------------------------------------------------------------------
 * Development Services
 * ------------------------------------------------------------------------
 */

angular.module('development')
  
  .service('dependencies', function (AppConfig) {
    return AppConfig.dependencies;
  });
