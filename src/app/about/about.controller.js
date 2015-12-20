(function(){
    'use strict';

    function AboutController() {

        var vm = this;
        vm.pageClass = 'page-about';

    }

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

})();
