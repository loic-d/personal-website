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
