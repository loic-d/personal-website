(function(){
    'use strict';

    function ContactController(Contact, Loading, $timeout, $location) {

        var vm = this;
        vm.pageClass = 'page-contact';
        vm.formData = {};
        vm.displayForm = true;

        // Reset the loading directive thought the Loading service
        Loading.triggerClear();

        vm.sendMessage = function() {

            vm.displayForm = false;
            Loading.triggerInProgress('sending...');

            Contact.sendMessage(vm.formData).then(function() {

                $timeout(function() {

                    Loading.triggerSuccess('message sent. i will get back to you soon.');

                }, 2000);

            }, function() {


            })
        };


    }

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

})();
