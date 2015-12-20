(function(){
    'use strict';

    function ArticleSingleController(Article, $routeParams) {

        var vm = this,
            id = $routeParams.id;

        vm.pageClass = 'page-article-single';
        vm.article = {};
        vm.isBusy = true;

        activate();

        function activate() {
            return getArticle(id)
                .then(function() {

                });
        }

        function getArticle(id) {

            return Article.getArticle(id)
                .then(function(data){
                    vm.article = data;
                    vm.isBusy = false;
                    return vm.article;
                });
        }

    }

    angular
        .module('app.articles')
        .controller('ArticleSingleController', ArticleSingleController);

})();
