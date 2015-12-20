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
