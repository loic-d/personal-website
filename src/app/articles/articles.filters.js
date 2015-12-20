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
