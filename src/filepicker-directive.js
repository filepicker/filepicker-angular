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
                pass original event
            */
            element.bind('change', function(event) {
                event.preventDefault();
                scope.onSuccess({event: event.originalEvent || event});
                $rootScope.$apply();
            });

            element = element.length ? element[0] : element;

            filepickerService.constructWidget(element);
        }
    };
}