(function(){
    'use strict';

    function HomeController(Article) {
        this.pageClass = 'page-home';
        this.isHomePage = 'true';

        // Preload articles
        Article.getArticles();
    }

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

})();
