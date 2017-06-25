(function(){
    'use strict';

    function loading (Loading, $location){
        return {
            restrict: 'E',
            templateUrl: 'app/components/loading.directive.html',
            link: function(scope, elem, attrs){

                var STATE = Loading.STATE;

                var loadingPath = getPath('.loading-path');
                var successPath = getPath('.success-path');
                var errorPath = getPath('.error-path');
                var errorPath2 = getPath('.error-path2');

                var loadingSegment = new Segment(loadingPath, 0, 0.1);
                var successSegment = new Segment(successPath, 0, 0.1);
                var errorSegment = new Segment(errorPath, 0, 0.1);
                var error2Segment = new Segment(errorPath2, 0, 0.1);

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

                        case STATE.FAIL: {
                            setErrorStyles();
                            errorAnimation();
                            break;
                        }

                    }

                });


                scope.$watch('loadingService.message', function() {
                    scope.message = scope.loadingService.message;
                });



                // --------------------------------------------------------------------------
                // Animation functions and helpers
                // Adapted from https://x-team.com/blog/creating-loading-buttons-svg-segment/
                // --------------------------------------------------------------------------

                function getPath(path){
                    return elem[0].querySelector(path);
                }


                // Clear
                function setClearStyles() {
                    loadingPath.style.visibility = 'hidden';
                    successPath.style.visibility = 'hidden';
                    errorPath.style.visibility = 'hidden';
                    errorPath2.style.visibility = 'hidden';
                }


                // In Progress
                function setInProgressStyles() {
                    loadingPath.style.visibility = 'visible';
                    successPath.style.visibility = 'hidden';
                    errorPath.style.visibility = 'hidden';
                    errorPath2.style.visibility = 'hidden';
                }

                function inProgressAnimation(){
                    loadingSegment.draw('15%', '25%', 0.2, {callback: function(){
                        loadingSegment.draw('75%', '150%', 0.3, {circular:true, callback: function(){
                            loadingSegment.draw('70%', '75%', 0.3, {circular:true, callback: function(){
                                loadingSegment.draw('100%', '100% + 0.1', 0.4, {circular:true, callback: function(){
                                    inProgressAnimation();
                                }});
                            }});
                        }});
                    }});
                }


                // Success
                function setSuccessStyles() {
                    loadingPath.style.visibility = 'hidden';
                    successPath.style.visibility = 'visible';
                    errorPath.style.visibility = 'hidden';
                    errorPath2.style.visibility = 'hidden';
                }

                function successAnimation() {
                    successSegment.draw('100% - 50', '100%', 0.4);
                }

                // Error
                function setErrorStyles() {
                  loadingPath.style.visibility = 'hidden';
                  successPath.style.visibility = 'hidden';
                  errorPath.style.visibility = 'visible';
                  errorPath2.style.visibility = 'visible';
                }

                function errorAnimation() {
                  errorSegment.draw('100% - 21.25', '100%', 0.4);
                  error2Segment.draw('100% - 21.25', '100%', 0.4);
                }

            }
        }
    }

    angular
        .module('app.components')
        .directive('loading', loading);

})();
