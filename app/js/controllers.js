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


    function newTextEntry (i) {
      return i.replace('/w', '');
    }

    $scope.getLocalData = function() {
      $scope.items = userServerData.getData().data;
      console.log("showing $scope.items:");
      console.log($scope.items);
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
        "link":$scope.newItem.mainLink,
        "desc":$scope.newItem.desc,
        "tags":$scope.newItem.tags,
        "fav":$scope.newItem.fav
      });
      */
      $scope.items.push(item);
    }

   
    /*Validate a url string, otherwise return false (or maybe null?)*/
    function validateURL(value) {
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }


    /*Function to delete item in remote DB*/
    $scope.deleteItemInDb = function (itemId) {
      console.log("calling controller function");
      if (userServerData.deleteItemInDb (itemId)) {
        
        /*delete at db was successful, now remove item from view*/
        for (var i = 0, len = $scope.items.length; i < len; ++i) {
          if ( $scope.items[i].itemId == itemId ) {
            console.log("deleting item id:" + itemId);
            $scope.items.splice(i,1);
            console.log($scope.items);
            break;
          }
        }
      } 
    }


    /*Functions to parse the text that a user enters in the omnibox*/
    $scope.parseOmnibox = function (userInput) {

        //var urlPattern = /(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)$/ig;  
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        urlRegex = new RegExp (urlRegex);

        //parse for urls, return array of them if found and then remove it from main text
        var urlArray = userInput.match(urlRegex);
      
        if (urlArray) {
            var l = urlArray.length;
            for (var i = 0; i < l; i++) {
                userInput = userInput.replace(urlArray[i], "");    
            }
        }

        console.log("urlArray: " + urlArray);      

        //parse for commands (i.e. tags) and extract them and remove from main text
        var tagIndex = userInput.indexOf("\/t ");
        var tagArray = new Array();

        if (tagIndex !== -1) {
            tagArray = userInput.substr(tagIndex).replace("\/t ", "").split(" ");
            userInput = userInput.replace(userInput.substr(tagIndex), "");
          
            console.log("tagArray=: " + tagArray);
        }

        //remaining text gets split by new lines into an array of 'notes'
        console.log("cleaned text: " + userInput);

        //start creating new item object
        $scope.newItem = {};

        //create new item's id (using the current date, in milliseconds. Will there be cases of ducpliate IDs?)
        $scope.newItem.itemId = new Date().getTime().toString();
        $scope.newItem.dateCreated = new Date().getTime();

        //TODO need to sanitize user text first
        $scope.newItem.userText = userInput;
        $scope.newItem.userUrlList = urlArray;
        $scope.newItem.tags = tagArray;    

        //default empty values for remotely fetched metadata
        $scope.newItem.mainLink = "(no main url)";
        $scope.newItem.title = "(no title)";
        $scope.newItem.desc = "(no desc)";

        //now take first url found, if any, and go get its metadata
        if (urlArray && validateURL (urlArray[0])) {
        
            //Initiate the main url metadata and bind them to the http service
            $scope.newItem.mainLink = urlArray[0];  

            //need to call 
            urlPreviewer.retrieveRemoteData($scope.newItem.mainLink).then(function(d){
                //TODO the first function within a then() call is for success. need to to for failure too
                console.log("remote metadata returned: ");
                console.log (d.data);

                if (typeof d.data.title !== 'undefined' && d.data.title!="") {
                  $scope.newItem.title = d.data.title;
                }

                if (typeof d.data.description !== 'undefined' && d.data.description!="") {
                  $scope.newItem.desc = d.data.description;
                }

                /*Split remotely fetched metatags appropriately and merge with user added tags*/
                if (typeof d.data.keywords !== 'undefined' && d.data.keywords!="") {
                  var remoteTags = d.data.keywords.split(",");
                  $scope.newItem.tags = tagArray.concat(remoteTags);
                }
                
                return true;
            });  
        } 

        console.log("new Item contains:");
        console.log ($scope.newItem);

    //now push it into db, then update view
    //if factory service that pushed new data into db is successful, push this item into view
    if (sendNewItemToDb($scope.newItem)) {
        pushNewItemIntoView($scope.newItem);
    }

    
    }//end of parseOmnibox

  }]);