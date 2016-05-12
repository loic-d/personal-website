(function(){
    'use strict';

    function aboutWidget (){
        return {
            restrict: 'E',
            templateUrl: 'app/components/about-widget.directive.html',
            replace: true
        }
    }

    angular
        .module('app.components')
        .directive('aboutWidget', aboutWidget);

})();
