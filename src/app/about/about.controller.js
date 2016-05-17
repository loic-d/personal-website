(function(){
    'use strict';

    function AboutController(Page, Loading, $timeout) {

        Loading.triggerClear();
        Loading.triggerInProgress();

        this.isBusy = true;
        this.pageClass = 'page-about';

        if(!Page.cachedPages['about']){
          Page.getPageById('about').then(function(renderedPage){
            this.renderedPage = renderedPage;
            this.isBusy = false;
          }.bind(this));
        }
        else {
          this.renderedPage = Page.cachedPages['about'];
          this.isBusy = false;
        }

    }

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

})();
