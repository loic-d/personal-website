(function(){
    'use strict';

    function Page($http, API_ROOT, PAGE_ENDPOINT){

      var _cachedPages = [];

      var _getPageById = function(id) {

          return $http.get(API_ROOT + PAGE_ENDPOINT + '?filter[name]=' + id)
              .then(getPageByIdComplete)
              .catch(getPageByIdFail);

          function getPageByIdComplete(response) {
              _cachedPages[id] = response.data[0].content.rendered;
              return response.data[0].content.rendered;
          }

          function getPageByIdFail(error) {
              console.log('Could not get page -->', id, ', Error: ', error);
          }

      };

      return {
          getPageById: _getPageById,
          cachedPages: _cachedPages
      };

    }

    angular
        .module('app.services')
        .factory('Page', Page);

})();
