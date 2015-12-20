(function(){
    'use strict';

    function Article($http){

        var baseUrl = 'http://localhost:8888/wp-json/';
        var isReady = false;

        var _getArticles = function() {

            return $http.get( baseUrl + 'posts/')
                .then(getArticlesComplete)
                .catch(getArticlesFailed);

            function getArticlesComplete(response) {

                isReady = true;
                return response.data;

            }

            function getArticlesFailed(error) {


            }

        }

        var _getArticle = function(id) {

            return $http.get( baseUrl + 'posts/' + id)
                .then(getArticleComplete)
                .catch(getArticleFailed);

            function getArticleComplete(response) {

                return response.data;

            }

            function getArticleFailed(error) {


            }

        }

        return {

            getArticles : _getArticles,
            getArticle :_getArticle

        };

    }

    angular
        .module('app.services')
        .factory('Article', Article);

})();