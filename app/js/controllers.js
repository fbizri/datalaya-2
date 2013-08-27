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
          $scope.items.push({
          "linkId":"3",
          "title":"title3",
          "link":"http://facebook.com/useless1/useless2/showthis20130101.html",
          "desc":"blablabla  so did the hand of the violinist who was deeply engrossed in the final stages of Mozart's 21st concerto (andante)",
          "tags":["tag1","tag2","tag3"],
          "fav":false});
          $scope.items.reverse();
      };

  }]);