(function(){
    'use strict';

    function config($routeProvider, hljsServiceProvider){

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
            .when('/articles/:slug', {
                controller: 'ArticleSingleController',
                controllerAs: 'articleSingleCtrl',
                templateUrl: 'app/articles/article-single.html'
            })
            .otherwise({
                redirectTo:'/'
            });

            hljsServiceProvider.setOptions({
          		tabReplace: '  '
          	});

    }

    function run($rootScope, $animate){

        $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
            switch(currentRoute.templateUrl) {
                case 'app/articles/articles.html':
                  $rootScope.bodyClass = 'articles-list';
                  break;
                case 'app/articles/article-single.html':
                    $rootScope.bodyClass = 'article-single';
                    break;
                case 'app/about/about.html':
                    $rootScope.bodyClass = 'body-about';
                    break;
                default:
                    $rootScope.bodyClass = '';
                    break;
            }
        });

        $animate.enabled(true);

    }

    angular
        .module('app')
        .config(config)
        .run(run);

})();
