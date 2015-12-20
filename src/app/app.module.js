(function(){
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngResource',
            'ngAnimate',
            'app.about',
            'app.articles',
            'app.components',
            'app.contact',
            'app.home'
        ]
    );

})();