(function(){
    'use strict';

    angular
        .module('app.constants', [])
        .constant('API_ROOT', 'http://loic-delaubier.com/api/wp-json/wp/v2')
        .constant('PAGE_ENDPOINT', '/pages')
        .constant('POST_ENDPOINT', '/posts');

})();
