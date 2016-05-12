(function(){
    'use strict';

    function ArticlesController(Article, Loading) {

        Loading.triggerClear();
        Loading.triggerInProgress();

        this.pageClass = 'page-articles';
        this.isBusy = true;

        // this.currentPage = 1;
        // this.numPages = 5;

        Article.getArticles().then(function(articles) {
            this.articles = articles;
            this.isBusy = false;
        }.bind(this));

    }

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

})();
