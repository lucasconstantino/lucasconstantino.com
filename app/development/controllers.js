/**
 * ------------------------------------------------------------------------
 * Development Controllers
 * ------------------------------------------------------------------------
 */

angular.module('development')
  
  // Development dependencies listing.
  .controller('DevelopmentController', function ($scope, dependencies) {
    $scope.node = dependencies.node;
    $scope.bower = dependencies.bower;
  });
