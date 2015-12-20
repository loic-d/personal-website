(function(){
    'use strict';

    function NavigationController($location) {

        var vm = this;
        vm.isCurrent = function(route){
            return route === $location.path();
        };

    }

    angular
        .module('app.components')
        .controller('NavigationController', NavigationController);

})();
