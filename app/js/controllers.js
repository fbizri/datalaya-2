'use strict';

/* Controllers */

angular.module('fadi2.controllers', [])
  .controller('MainCtrl', ['$scope', 'userServerData', 'appState', 'urlPreviewer', function ($scope, userServerData, appState, urlPreviewer) {	

    //Initialize 
    $scope.command="no command";
    $scope.state = appState.getState();
    $scope.entry = "no entry";
     
    //Get saved links from remote server and bind them to $scope.items
    userServerData.retrieveRemoteData().then(function(d){
    $scope.items = d.data;
    //console.log($scope.items);
    });
   
    //empty user input (could be a url, text, or url and text combo)
    $scope.newItem = {};


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

    /*New data coming in from user input (url + text combo). Sanitize it,then
    call function that sends new data to db*/
    function processNewItem (item) {
      
      var newItem = {};
      //TODO: SANITIZE this data

      /*Split tags appropriately*/
      if (item.keywords!="") {
        newItem.tags = item.keywords.split(",");
      }

      if (item.title!="") {
        newItem.title = item.title;
      }

      if (item.description!="") {
        newItem.desc = item.description;
      }

      //console.log (newItem.title + ' ' + newItem.tags);
      
      //if factory service that pushed new data into db is successful, push this item into view
      if (sendNewItemToDb(newItem)) {
        pushNewItemIntoView(newItem);
      }
               
    };

    function sendNewItemToDb(newItem) {
      //call function in userServerData factory
      return userServerData.sendNewItemToDb(newItem);
    };

    /*On success of new item saved in remote db, 
    push the new item into the local list, to show in the view*/
    function pushNewItemIntoView(item) {       
      /*
      $scope.items.push({
        "linkId": $scope.newItem.title,
        "title":$scope.newItem.title,
        "link":$scope.newItem.link,
        "desc":$scope.newItem.desc,
        "tags":$scope.newItem.tags,
        "fav":$scope.newItem.fav
      });
      */
      $scope.items.push(item);
    }

    //Call factory service UrlPreviwer, get the metadata and bind it to $scope
    $scope.getUrlData = function (url) {
      urlPreviewer.retrieveRemoteData(url).then(function(d){
      processNewItem (d.data);
      console.log(d.data);
      });
    }

  }]);