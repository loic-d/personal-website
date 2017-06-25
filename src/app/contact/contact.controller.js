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
            Loading.triggerInProgress('Sending...');

            Contact.sendMessage(this.formData).then(function() {
                $timeout(function() {
                    Loading.triggerSuccess('Message sent. I will get back to you soon.');
                }, 1500);
            }, function(error) {
                $timeout(function() {
                    Loading.triggerFail('Something went wrong. Please try again.');
                }, 1500);
            })
        };


    }

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

})();
