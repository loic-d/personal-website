(function(){
    'use strict';

    function Article($http, API_ROOT, POST_ENDPOINT){

        var isReady = false;

        var _getArticles = function() {

            return $http.get( API_ROOT + POST_ENDPOINT)
                .then(getArticlesComplete)
                .catch(getArticlesFailed);

            function getArticlesComplete(response) {
                isReady = true;
                return response.data;
            }

            function getArticlesFailed(error) {
              console.log('Could not get posts, Error: ', error);
            }

        }

        var _getArticleBySlug = function(slug) {

            return $http.get( API_ROOT + POST_ENDPOINT + '?filter[name]=' + slug)
                .then(getArticleComplete)
                .catch(getArticleFailed);

            function getArticleComplete(response) {
                return response.data[0];
            }

            function getArticleFailed(error) {
              console.log('Could not get post -->', slug, ', Error: ', error);
            }

        }

        return {
            getArticles : _getArticles,
            getArticleBySlug : _getArticleBySlug
        };

    }

    angular
        .module('app.services')
        .factory('Article', Article);

})();
