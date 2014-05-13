/**
 * ------------------------------------------------------------------------
 * Application Starter
 * ------------------------------------------------------------------------
 * As we intend to use RequireJS to asynchronously start our app, we should
 * handle AngularJS bootstraping so that we make sure it only occurs after
 * we load all our modules and their dependencies.
 */

angular.element().ready(function() {
  angular.bootstrap(document, [config.project.name])
});
