(function(){
    'use strict';

    angular
        .module('app', [
            'hljs',
            'ngRoute',
            'ngResource',
            'ngAnimate',
            'ngSanitize',
            'app.templates',
            'app.constants',
            'app.helpers',
            'app.components',
            'app.services',
            'app.about',
            'app.articles',
            'app.contact',
            'app.home'
        ]
    );

})();
