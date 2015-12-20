(function(){
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngResource',
            'ngAnimate',
            'ngSanitize',
            'ui.bootstrap',
            'app.components',
            'app.services',
            'app.about',
            'app.articles',
            'app.contact',
            'app.home'
        ]
    );

})();