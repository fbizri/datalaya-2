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

    /*prepare data received after url analysis and push it to db*/
    function processNewItem (item, url) {
      
      var newItem = {};

      newItem.link = url;

      newItem.itemId = $scope.items.length + 1;

      /*Split tags appropriately*/
      if (typeof item.keywords !== 'undefined' && item.keywords!="") {
        newItem.tags = item.keywords.split(",");
      }

      if (typeof item.title !== 'undefined' && item.title!="") {
        newItem.title = item.title;
      }

      if (typeof item.description !== 'undefined' && item.description!="") {
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

      if (validateURL (url)) {
        urlPreviewer.retrieveRemoteData(url).then(function(d){
          processNewItem (d.data, url);
        });
      }
      else {
        console.log("invalid url detected");
      }
    }

    function validateURL(value) {
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }

    /*Function to delete item in remote DB*/
    $scope.deleteItemInDb = function (itemId) {
      console.log("calling controller function");
      if (userServerData.deleteItemInDb (itemId)) {
        
        /*delete at db was successful, now remove item from view*/
        for (var i = 0, len = $scope.items.length; i < len; ++i) {
          if ( $scope.items[i]._id.$oid == itemId ) {
            console.log("deleting item id:" + itemId);
            $scope.items.splice(i,1);
            console.log($scope.items);
            break;
          }
        }
      } 
    } 
    

  }]);