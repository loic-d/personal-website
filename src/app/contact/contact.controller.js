(function(){
    'use strict';

    function ContactController(Contact, Loading, $timeout, $location) {

        this.pageClass = 'page-contact';
        this.formData = {};
        this.displayForm = true;

        // Reset the loading directive thought the Loading service
        Loading.triggerClear();

        this.sendMessage = function() {

            this.displayForm = false;
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
