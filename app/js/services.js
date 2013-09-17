'use strict';

/* Services */

angular.module('fadi2.services', [])
.factory('userServerData', ['$http', function ($http) {
	
     /*userData is the local object containing all current saved user data*/
    var userData = {};
    userData.items ={};
    userData.newData = false;

	/*Get user's saved items from the server, now hardcoded below
	items = [
      {
        "linkId":"1",
        "title":"title1",
        "link":"http://facebook.com/useless1/useless2/showthis20130101.html",
        "desc":"And as Jane's hair gently waived to sound of the evening breeze, so did the hand of the violinist who was deeply engrossed in the final stages of Mozart's 21st concerto (andante)",
        "tags":["tag1","tag2","tag3"],
        "fav":false
      },
      {
        "linkId":"2",
        "title":"title2",
        "link":"http://facebook.com/useless1/useless2/showthis20130101.html",
        "desc":"As Goku saw his oldest friend explode into dust by the hand of the evil murderer Freeza, a huge swell of anger rose within him. So grave was it that he felt his consciousness leave him, and instead give way to rage pure rage",          
        "tags":["tag4","tag5","tag6"],
        "fav":false
      }
    ];
    */

    userData.retrieveRemoteData = function () {
        return $http.get('https://api.mongohq.com/databases/datalaya-db-1/collections/links/documents?_apikey=csximh8vo2kd40en5la8')
        .then(function(data){
            userData.setData (data);
            //userData.getData();
            console.log("called .then in factory");
            return userData.items;
        });
    };

    userData.getData = function () {
    	console.log("getData called");
        console.log(userData.items);
        return userData.items;
    };

    userData.setData = function (data){
        return userData.items = data;
    };

    return userData;

}])
.factory('appState', [function () {
    /*Factory that maintains the app's various states*/

    var omniBoxState = {};
    omniBoxState.state = "neutral";
    omniBoxState.getState = function () {
            return omniBoxState.state;
    }
    
    omniBoxState.setState = function (state) {
        omniBoxState.state = state;
    }
    return omniBoxState;
}])
.factory ('urlPreviewer', [function () {
    /*Factory that remotelyt fetches the metadata of any user-submitted link*/

}]);
