(function(){
    'use strict';

    function HomeController() {

        var vm = this;
        vm.pageClass = 'page-home';
        vm.isHomePage = 'true';

    }

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

})();
