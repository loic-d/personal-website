(function(){
    'use strict';

    function ArticlesController(Article, Loading) {

        Loading.triggerClear();
        Loading.triggerInProgress();

        this.pageClass = 'page-articles';
        this.isBusy = true;

        Article.getArticles().then(function(articles) {
            //TODO: Remove splice
            articles.splice(0,1);
            this.articles = articles;
            this.isBusy = false;
        }.bind(this));

    }

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

})();
