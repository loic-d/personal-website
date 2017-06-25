(function(){
    'use strict';

    angular
        .module('app.constants', [])
        .constant('API_ROOT', 'http://vps135707.vps.ovh.ca/api/wp-json/wp/v2')
        .constant('CONTACT_SCRIPT', 'http://vps135707.vps.ovh.ca/assets/php/contact.php')
        .constant('PAGE_ENDPOINT', '/pages')
        .constant('POST_ENDPOINT', '/posts');

})();
