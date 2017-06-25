(function(){
    'use strict';

    function Contact($http, $q, CONTACT_SCRIPT){

        var _sendMessage = function(data) {

            var deferred = $q.defer();

            $http.post(CONTACT_SCRIPT, data, {
                  headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                  }
                })
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
