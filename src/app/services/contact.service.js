(function(){
    'use strict';

    function Contact($http, $q){

        var POST_URL = 'http://www.loic-delaubier.com/assets/php/contact.php';

        var _sendMessage = function(data) {

            var deferred = $q.defer();

            return $http.post(POST_URL, data, {
                  headers : {
                      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }})
                .then(function(){
                    deferred.resolve()
                }, function() {
                    deferred.reject();
                });

            return deferred.promise;

        };

        return {
            sendMessage: _sendMessage
        };
    }

    angular
        .module('app.services')
        .factory('Contact', Contact);

})();
