/**
 * ------------------------------------------------------------------------
 * Development Services
 * ------------------------------------------------------------------------
 */

angular.module('development')
  
  .service('dependencies', function (AppConfig) {

    var bower = AppConfig.dependencies.bower
      , node = AppConfig.dependencies.node;

    var overrides = {
      'angular-translate': 'https://github.com/angular-translate/bower-angular-translate',
      'canvas': 'https://github.com/Automattic/node-canvas'
    };

    ['bower', 'node'].forEach(function (pm) {
      var projects = AppConfig.dependencies[pm];
      Object.keys(projects).forEach(function (project) {
        var parser = document.createElement('a');
        parser.href = overrides[project] || projects[project].homepage;
        projects[project].repo = parser.pathname.replace(/\//, '');
      });
    });

    return AppConfig.dependencies;
  });
