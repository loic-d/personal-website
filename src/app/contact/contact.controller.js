(function(){
    'use strict';

    function ContactController() {

        var vm = this;
        vm.pageClass = 'page-contact';

    }

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

})();
