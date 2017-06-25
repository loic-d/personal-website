(function(){
    'use strict';

    function ArticleSingleController(Article, Loading, $routeParams, $rootScope) {
        var slug = $routeParams.slug;

        Loading.triggerClear();
        Loading.triggerInProgress();

        this.pageClass = 'page-article-single';
        this.isBusy = true;

        Article.getArticleBySlug(slug).then(function(article) {
            this.article = article;
            if (article.title && article.title.rendered) {
                // Update page title
                $rootScope.title = article.title.rendered;
            }
            this.isBusy = false;
        }.bind(this));
    }

    angular
        .module('app.articles')
        .controller('ArticleSingleController', ArticleSingleController);

})();
