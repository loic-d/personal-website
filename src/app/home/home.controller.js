(function(){
    'use strict';

    function HomeController() {

        this.pageClass = 'page-home';
        this.isHomePage = 'true';

    }

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

})();
