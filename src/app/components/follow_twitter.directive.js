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
