'use strict';

/* Controllers */

angular.module('fadi2.controllers', [])
  .controller('MainCtrl', ['$scope', 'userServerData', 'appState', function ($scope, userServerData, appState) {	

    //listing-related stuff, all obtain from the userServerData factory
    $scope.items = userServerData.getData();
    $scope.command="no command";
    $scope.state = appState.omniBoxState;
    $scope.entry = "no entry";



    /*This function receives users input thrown into the omni box. 
      Sanitize, analyze and then do somethng with it*/
      $scope.receivePaste = function() {
        var i = $scope.omni;

        if ( i==="*w" ) {
          $scope.command = "*w detected!";
          $scope.state = appState.omniBoxState ="writing text post";                
        }

        if ()

          
          /*
          $scope.items.push({
          "linkId":"3",
          "title":"title3",
          "link":"http://facebook.com/useless1/useless2/showthis20130101.html",
          "desc":"blablabla  so did the hand of the violinist who was deeply engrossed in the final stages of Mozart's 21st concerto (andante)",
          "tags":["tag1","tag2","tag3"],
          "fav":false});
          $scope.items.reverse();
          */
      };

      function newTextEntry (i) {
        return i.replace('*w', '');
      }

  }]);