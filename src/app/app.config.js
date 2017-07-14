(function(){
    'use strict';

    function config($routeProvider, $locationProvider, hljsServiceProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                title: 'Home',
                description: 'Passionate Software Developer focusing on building web applications and user interfaces with great usability and experience for end users.',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                templateUrl:'app/home/home.html'
            })
            .when('/contact', {
                title: 'Contact',
                description: 'Feel free to connect with me online!',
                controller: 'ContactController',
                controllerAs: 'contactCtrl',
                templateUrl: 'app/contact/contact.html'
            })
            .when('/about', {
                title: 'About',
                description: 'Strong interest in the JavaScript ecosystem, UI development and open-source technologies.',
                controller: 'AboutController',
                controllerAs: 'aboutCtrl',
                templateUrl: 'app/about/about.html'
            })
            .when('/articles', {
                title: 'Articles',
                description: 'Read my latest articles on Front-end Software Development.',
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

    function run($rootScope, $route, $animate){
        $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
            // Update page title
            $rootScope.title = $route.current.title;
            // Update page description
            $rootScope.description = $route.current.description;

            switch(currentRoute.templateUrl) {
                case 'app/articles/articles.html':
                  $rootScope.bodyClass = 'articles-list';
                  break;
                case 'app/articles/article-single.html':
                    $rootScope.bodyClass = 'article-single';
                    break;
                case 'app/about/about.html':
                    $rootScope.bodyClass = 'about';
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
