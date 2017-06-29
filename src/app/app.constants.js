(function(){
    'use strict';

    angular
        .module('app.constants', [])
        .constant('API_ROOT', 'https://loic-delaubier.com/api/wp-json/wp/v2')
        .constant('CONTACT_SCRIPT', 'https://loic-delaubier.com/assets/php/contact.php')
        .constant('PAGE_ENDPOINT', '/pages')
        .constant('POST_ENDPOINT', '/posts');

})();
