(function(){
    'use strict';

    function config($routeProvider){

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                templateUrl:'app/home/home.html'
            })
            .when('/contact', {
                controller: 'ContactController',
                controllerAs: 'contactCtrl',
                templateUrl: 'app/contact/contact.html'
            })
            .when('/about', {
                controller: 'AboutController',
                controllerAs: 'aboutCtrl',
                templateUrl: 'app/about/about.html'
            })
            .when('/articles', {
                controller: 'ArticlesController',
                controllerAs: 'articlesCtrl',
                templateUrl: 'app/articles/articles.html'
            })
            .when('/articles/:id', {
                controller: 'ArticleSingleController',
                controllerAs: 'articleSingleCtrl',
                templateUrl: 'app/articles/article-single.html'
            })
            .otherwise({
                redirectTo:'/'
            });

    }

    function run($rootScope){

        $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
            switch(currentRoute.templateUrl) {
                case 'app/articles/article-single.html':
                    $rootScope.bodyClass = 'article-single';
                    break;
                default:
                    $rootScope.bodyClass = '';
                    break;
            }
        });

    }

    angular
        .module('app')
        .config(config)
        .run(run);

})();

