;(function(){

  // Adapted from http://codepen.io/dleatherman/pen/kAzgw to support colors and multiple viewports

  // CONSTANTS
  var DOTS = {
    NB: {
      MOBILE: 45,
      TABLET: 115,
      DESKTOP: 150
    },
    DISTANCE: 100,
    D_RADIUS: 110,
    COLLECTION: []
  };

  var COLORS = [
    '#2176AE',
    '#57B8FF',
    '#B66D0D',
    '#FBB13C',
    '#FE6847'
  ];

  var BREAKPOINTS = {
    MOBILE: 667,
    TABLET: 1024,
    DESKTOP: 1200
  };


  // Variables
  var canvas,
      context,
      dotColorIndex = 0,
      lineColorIndex = 0,
      mousePosition = {
        x: 30 * window.innerWidth / 100,
        y: 30 * window.innerHeight / 100
      },
      nbOfDotsForViewport = getNbOfDotsForViewport();


  // Init Canvas
  function initCanvas() {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    context.lineWidth = .3;
  };

  function getNbOfDotsForViewport() {
    return window.innerWidth >= BREAKPOINTS.DESKTOP ? DOTS.NB.DESKTOP : (window.innerWidth <= BREAKPOINTS.MOBILE ? DOTS.NB.MOBILE : DOTS.NB.TABLET);
  }


  // Constructor
  var Dot = function() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.3 + Math.random();
    this.vy = -.3 + Math.random();

    this.radius = Math.random()*1.4;

    this.nbOfDots = window.innerWidth >= BREAKPOINTS.DESKTOP ? DOTS.NB.DESKTOP : (window.innerWidth <= BREAKPOINTS.MOBILE ? DOTS.NB.MOBILE : DOTS.NB.TABLET);
  };

  Dot.prototype.getNbOfDots = function(){
      return this.nbOfDots;
  };

  Dot.prototype.create = function() {
      dotColorIndex == COLORS.length ? dotColorIndex = 0 : dotColorIndex++;
      context.fillStyle = COLORS[dotColorIndex];
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
  };

  Dot.prototype.move = function(){
      for(var i = 0; i < this.getNbOfDots(); i++){
        var dot = DOTS.COLLECTION[i];
        if(dot.y < 0 || dot.y > canvas.height){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y +=dot.vy;
      }
  };

  Dot.prototype.line = function() {
    for(var i = 0; i < this.getNbOfDots(); i++){
      for(var j = 0; j < this.getNbOfDots(); j++){
        lineColorIndex == COLORS.length ? lineColorIndex = 0 : lineColorIndex++;
        i_dot = DOTS.COLLECTION[i];
        j_dot = DOTS.COLLECTION[j];
        if((i_dot.x - j_dot.x) < DOTS.DISTANCE && (i_dot.y - j_dot.y) < DOTS.DISTANCE && (i_dot.x - j_dot.x) > - DOTS.DISTANCE && (i_dot.y - j_dot.y) > - DOTS.DISTANCE){
          if((i_dot.x - mousePosition.x) < DOTS.D_RADIUS && (i_dot.y - mousePosition.y) < DOTS.D_RADIUS && (i_dot.x - mousePosition.x) > - DOTS.D_RADIUS && (i_dot.y - mousePosition.y) > - DOTS.D_RADIUS){
            context.beginPath();
            context.moveTo(i_dot.x, i_dot.y);
            context.lineTo(j_dot.x, j_dot.y);
            context.strokeStyle = COLORS[lineColorIndex];
            context.stroke();
            context.closePath();
          }
        }
      }
    }
  };

  function generateDots(){
    initCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < nbOfDotsForViewport; i++){
      DOTS.COLLECTION.push(new Dot());
      dot = DOTS.COLLECTION[i];
      dot.create();
    }
    dot.line();
    dot.move();
  }

  $('canvas').on('mousemove mouseleave', function(e){
    if(e.type == 'mousemove'){
      mousePosition.x = e.pageX;
      mousePosition.y = e.pageY;
    }
    if(e.type == 'mouseleave'){
      mousePosition.x = canvas.width / 2;
      mousePosition.y = canvas.height / 2;
    }
  });

  $(window).on('resize', function() {
    clearInterval(dotInterval);
    initCanvas();
    nbOfDotsForViewport = getNbOfDotsForViewport();
    dotInterval = setInterval(generateDots, 1000/20);
  });

  var dotInterval = setInterval(generateDots, 1000/20);

})();

(function(){
    'use strict';

    angular
        .module('app.services', []);

})();
(function(){
    'use strict';

    function Article($http){

        var baseUrl = 'http://localhost:8888/wp-json/';
        var isReady = false;

        var _getArticles = function() {

            return $http.get( baseUrl + 'posts/')
                .then(getArticlesComplete)
                .catch(getArticlesFailed);

            function getArticlesComplete(response) {

                isReady = true;
                return response.data;

            }

            function getArticlesFailed(error) {


            }

        }

        var _getArticle = function(id) {

            return $http.get( baseUrl + 'posts/' + id)
                .then(getArticleComplete)
                .catch(getArticleFailed);

            function getArticleComplete(response) {

                return response.data;

            }

            function getArticleFailed(error) {


            }

        }

        return {

            getArticles : _getArticles,
            getArticle :_getArticle

        };

    }

    angular
        .module('app.services')
        .factory('Article', Article);

})();
(function(){
    'use strict';

    function Contact($http, $q){

        var POST_URL = 'http://www.loic-delaubier.com/assets/php/contact.php';

        var _sendMessage = function(data) {

            var deferred = $q.defer();

            return $http.post(POST_URL, data, {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }}
            )
                .then(function(){
                    deferred.resolve()
                    return deferred.promise;
                }, function() {
                    deferred.reject();
                })

        };


        return {
            sendMessage: _sendMessage
        };
    }

    angular
        .module('app.services')
        .factory('Contact', Contact);

})();
(function(){
    'use strict';

    angular.module('app.home', []);

})();
(function(){
    'use strict';

    function HomeController() {

        var vm = this;
        vm.pageClass = 'page-home';
        vm.isHomePage = 'true';

    }

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

})();

(function(){
    'use strict';

    angular
        .module('app.articles', ['app.services']);

})();
(function(){
    'use strict';

    function ArticlesController(Article) {

        var vm = this;
        vm.pageClass = 'page-articles';
        vm.articles = [];
        vm.isBusy = true;
        vm.currentPage = 1;
        vm.numPages = 5;

        if(!Article.isBusy){
            activate();
        }

        function activate() {
            return getArticles();
        }

        function getArticles() {
            return Article.getArticles()
                .then(function(data) {

                    vm.articles = data;
                    if(vm.articles){
                        vm.isBusy = false;
                        return vm.articles;
                    }
                });
        }

    }

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

})();

(function(){
    'use strict';

    function tag() {

        return function(tag) {
            return '#'+tag;
        };

    }

    angular
        .module('app.articles')
        .filter('tag', tag);

})();

(function(){
    'use strict';

    function ArticleSingleController(Article, $routeParams) {

        var vm = this,
            id = $routeParams.id;

        vm.pageClass = 'page-article-single';
        vm.article = {};
        vm.isBusy = true;

        activate();

        function activate() {
            return getArticle(id)
                .then(function() {

                });
        }

        function getArticle(id) {

            return Article.getArticle(id)
                .then(function(data){
                    vm.article = data;
                    vm.isBusy = false;
                    return vm.article;
                });
        }

    }

    angular
        .module('app.articles')
        .controller('ArticleSingleController', ArticleSingleController);

})();

(function(){
    'use strict';

    angular
        .module('app.about', []);

})();
(function(){
    'use strict';

    function AboutController() {

        var vm = this;
        vm.pageClass = 'page-about';

    }

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

})();

(function(){
    'use strict';

    angular.module('app.contact', ['app.components']);

})();
(function(){
    'use strict';

    function ContactController(Contact, Loading, $timeout, $location) {

        var vm = this;
        vm.pageClass = 'page-contact';
        vm.formData = {};
        vm.displayForm = true;

        // Reset the loading directive thought the Loading service
        Loading.triggerClear();

        vm.sendMessage = function() {

            vm.displayForm = false;
            Loading.triggerInProgress('sending...');

            Contact.sendMessage(vm.formData).then(function() {

                $timeout(function() {

                    Loading.triggerSuccess('message sent. i will get back to you soon.');

                }, 2000);

            }, function() {


            })
        };


    }

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

})();

(function(){
    'use strict';

    angular.module('app.components', []);

})();
(function(){
    'use strict';

    function NavigationController($location) {

        var vm = this;
        vm.isCurrent = function(route){
            if(route.indexOf('articles') > 0 && $location.path().indexOf('articles') > 0) return true;
            return route === $location.path();
        };

    }

    angular
        .module('app.components')
        .controller('NavigationController', NavigationController);

})();

(function(){
    'use strict';

    function mainNav (){
        return {
            restrict: 'E',
            templateUrl: 'app/components/navigation.directive.html',
            controller: 'NavigationController',
            controllerAs: 'navCtrl',
            replace: true
        }
    }

    angular
        .module('app.components')
        .directive('mainNav', mainNav);

})();

(function(){
    'use strict';

   function Loading() {


       return {

           STATE : {
               CLEAR: 'clear',
               LOADING: 'loading',
               SUCCESS: 'success',
               FAIL: 'fail'
           },

           display: false,
           state: null,
           message: null,

           triggerInProgress: function(msg){
               this.display = true;
               this.state = this.STATE.LOADING;
               this.message = msg;
           },

           triggerSuccess: function(msg) {
               this.display = true;
               this.state = this.STATE.SUCCESS;
               this.message = msg;
           },

           triggerFail: function(msg) {
               this.display = true;
               this.state = this.STATE.FAIL;
               this.message = msg;
           },

           triggerClear: function() {
               this.state = null;
               this.message = null;
               this.display = false;
           }

       }

   }

    angular
        .module('app.components')
        .factory('Loading', Loading);

})();

(function(){
    'use strict';

    function loading (Loading, $location){
        return {
            restrict: 'E',
            templateUrl: 'app/components/loading.directive.html',
            link: function(scope, elem, attrs){

                var STATE = Loading.STATE;

                scope.loadingService = Loading;

                scope.display = false;
                scope.state = null;
                scope.message = null;


                scope.$watch('loadingService.display', function() {

                    scope.display = scope.loadingService.display;

                });

                scope.$watch('loadingService.state', function() {

                    scope.state = scope.loadingService.state;

                    switch(scope.state){

                        case STATE.CLEAR:
                            setClearStyles();
                            break;

                        case STATE.LOADING:
                            setInProgressStyles();
                            inProgressAnimation();
                            break;

                        case STATE.SUCCESS:
                            setSuccessStyles();
                            successAnimation();
                            break;

                    }

                });


                scope.$watch('loadingService.message', function() {

                    scope.message = scope.loadingService.message;

                });



                // -------------------------------
                // Animation functions and helpers
                // -------------------------------

                function getPath(path){
                    return elem[0].querySelector(path);
                }

                var loading_path = getPath('.loading-path'),
                    success_path = getPath('.success-path'),
                    loading_segment = new Segment(loading_path, 0, 0.1),
                    success_segment = new Segment(success_path, 0, 0.1);


                // Clear
                function setClearStyles() {
                    loading_path.style.visibility = 'hidden';
                    success_path.style.visibility = 'hidden';
                }


                // In Progress
                function setInProgressStyles() {
                    loading_path.style.visibility = 'visible';
                    success_path.style.visibility = 'hidden';
                }

                function inProgressAnimation(){
                    loading_segment.draw('15%', '25%', 0.2, {callback: function(){
                        loading_segment.draw('75%', '150%', 0.3, {circular:true, callback: function(){
                            loading_segment.draw('70%', '75%', 0.3, {circular:true, callback: function(){
                                loading_segment.draw('100%', '100% + 0.1', 0.4, {circular:true, callback: function(){
                                    inProgressAnimation();
                                }});
                            }});
                        }});
                    }});
                }


                // Success
                function setSuccessStyles() {
                    loading_path.style.visibility = 'hidden';
                    success_path.style.visibility = 'visible';
                }

                function successAnimation(){
                    success_segment.draw('100% - 50', '100%', 0.4, {callback: function(){}});
                }


            }
        }
    }

    angular
        .module('app.components')
        .directive('loading', loading);

})();

(function(){
    'use strict';

    function socialIcons (){
        return {
            restrict: 'E',
            templateUrl: 'app/components/social-icons.directive.html',
            replace: true
        }
    }

    angular
        .module('app.components')
        .directive('socialIcons', socialIcons);

})();

(function(){
    'use strict';

    function followTwitterController($timeout) {

        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };

            return t;
        }(document, "script", "twitter-wjs"));

        $timeout(function(){
            twttr.widgets.load();
        }, 100);

    }

    angular
        .module('app.components')
        .controller('followTwitterController', followTwitterController);

})();

(function(){
    'use strict';

    function twitterFollow (){
        return {
            restrict: 'E',
            template: '<a class="twitter-follow-button" data-show-count="false" href="https://twitter.com/loicMTL">Follow @LoicMTL</a>',
            controller: 'followTwitterController',
            controllerAs: 'twitterCtrl',
            replace: true
        }
    }

    angular
        .module('app.components')
        .directive('twitterFollow', twitterFollow);

})();

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

