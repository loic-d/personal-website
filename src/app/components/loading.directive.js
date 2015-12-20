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
