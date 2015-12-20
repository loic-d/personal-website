(function(){
    'use strict';

    function ArticlesController() {

        var vm = this;
        vm.pageClass = 'page-articles-list';

    }

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

})();
