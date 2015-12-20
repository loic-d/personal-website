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
