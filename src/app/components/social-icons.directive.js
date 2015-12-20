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
