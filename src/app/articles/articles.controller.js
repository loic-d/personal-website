(function(){
    'use strict';

    function ArticlesController(Article) {

        var vm = this;
        vm.pageClass = 'page-articles';
        vm.articles = [];
        vm.isBusy = true;
        vm.currentPage = 1;
        vm.numPages = 5;

        if(!Article.isBusy){
            activate();
        }

        function activate() {
            return getArticles();
        }

        function getArticles() {
            return Article.getArticles()
                .then(function(data) {

                    vm.articles = data;
                    if(vm.articles){
                        vm.isBusy = false;
                        return vm.articles;
                    }
                });
        }

    }

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

})();
