(function(){
    'use strict';

    function ArticlesController(Article, Loading) {

        Loading.triggerClear();
        Loading.triggerInProgress();

        this.pageClass = 'page-articles';
        this.isBusy = true;

        Article.getArticles().then(function(articles) {
            this.articles = articles.slice().reverse();
            this.isBusy = false;
        }.bind(this));

    }

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

})();
