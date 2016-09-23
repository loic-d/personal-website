(function(){
    'use strict';

    function ArticleSingleController(Article, Loading, $routeParams) {

        var slug = $routeParams.slug;

        Loading.triggerClear();
        Loading.triggerInProgress();

        this.pageClass = 'page-article-single';
        this.isBusy = true;

        Article.getArticleBySlug(slug).then(function(article){
            this.article = article;
            this.isBusy = false;
        }.bind(this));

    }

    angular
        .module('app.articles')
        .controller('ArticleSingleController', ArticleSingleController);

})();
