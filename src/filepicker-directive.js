'use strict';

angular.module('angular-filepicker')
.directive('filepicker', filepickerDirective);

function filepickerDirective($rootScope, filepickerService){
	return {
        restrict: 'A',
        scope:{
            onSuccess:'&'
        },
        link: function(scope, element, attrs) {
            /*
                pass orinal event
            */
            element.bind('change', function(event) {
                event.preventDefault();
                scope.onSuccess({event: event.originalEvent});
                $rootScope.$apply();
            });
        	filepickerService.constructWidget(element);
        }
    };
};


