'use strict';

/* Controllers */

angular.module('fadi2.controllers', [])
  .controller('MainCtrl', ['$scope', 'userServerData', function ($scope, userServerData) {	

    //listing-related stuff, all obtain from the userServerData factory
    $scope.items = userServerData.getData();

    /*This function receives users input thrown into the omni box. 
      Sanitize, analyze and then do somethng with it*/
      $scope.receivePaste = function() {
        $scope.userInput = $scope.omni;
        $scope.items.push({"3", "title 3", "blabla", "bla", '', true}).
      }

  }]);