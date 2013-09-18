'use strict';

/* Controllers */

angular.module('fadi2.controllers', [])
  .controller('MainCtrl', ['$scope', 'userServerData', 'appState', function ($scope, userServerData, appState) {	

    //Initialize 
    $scope.command="no command";
    $scope.state = appState.getState();
    $scope.entry = "no entry";
     
    //Get saved links from remote server
    userServerData.retrieveRemoteData().then(function(d){
      //console.log("called then in controller");
      $scope.items = d.data;
      //console.log($scope.items);
    });
   

    /*This function receives user's input thrown into the omni box. 
    Sanitize, analyze and then do somethng with it*/
    $scope.receivePaste = function() {
      var i = $scope.omni;

      if ( i==="/w" ) {
        $scope.command = "w detected!";
        $scope.state = appState.omniBoxState ="writing text post";                
      }

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
      return i.replace('/w', '');
    }

    $scope.getLocalData = function() {
      $scope.items = userServerData.getData().data;
      console.log("showing $scope.items:");
      console.log($scope.items);
    };

    $scope.processNewItem = function () {
      console.log("before:" + $scope.newItem.tags);
      $scope.newItem.tags = $scope.newItem.tags.split(",");
      console.log("after:" + $scope.newItem.tags[2]);
      $scope.items.push({
        "linkId":'na',
        "title":$scope.newItem.title,
        "link":$scope.newItem.link,
        "desc":$scope.newItem.desc,
        "tags":$scope.newItem.tags,
        "fav":$scope.newItem.fav
      });
      $scope.items.reverse();
    };

  }]);