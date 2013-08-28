'use strict';

/* Services */

angular.module('fadi2.services', [])
.factory('userServerData', [function () {
	
	/*Get user's saved items from the server, now hardocded below*/
	var items = [
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
        "desc":"As Goku saw his oldest friend explode into dust by the hand of the evil murdere Freeza, a huge swell of anger rose within him. So grave was it that he felt his consciousness leave him, and instead give way to rage pure rage",          
        "tags":["tag4","tag5","tag6"],
        "fav":false
      }
    ];

    /*userData is the local object containing all current saved user data*/
    var userData = {};
    userData.getData = function () {
    	return items;
    };

	return userData;
}])
.factory('appState', [function () {
    return {
        model: {
            omniBoxState: 'neutral'
        }
    }
}]);
