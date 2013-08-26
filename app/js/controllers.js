'use strict';

/* Controllers */

angular.module('fadi2.controllers', [])
  .controller('MainCtrl', ['$scope', 'userServerData', function ($scope, userServerData) {	
    
    //Omni-related stuff
    $scope.pasted = "no";

      /*This function receives users input thrown into the omni box. Sanitize, analyze and then do somethng with it*/
      $scope.receivePaste = function() {
        $scope.receivedPaste = $scope.omni;
        $scope.pasted = "yes";
      }


    //listing-related stuff, all obtain from the userServerData factory
    $scope.items = userServerData.getData();

  }]);