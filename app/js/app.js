'use strict';


// Declare app level module which depends on filters, and services
angular.module('fadi2', ['fadi2.filters', 'fadi2.services', 'fadi2.directives', 'fadi2.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MainCtrl'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])
  .config(['$httpProvider', function($httpProvider) {
  	/*Some weird issue with Angular or Angular seed when doing $http.get(). This fixes it*/
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

