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
            var key, value;
            /*
                pass original event
            */
            element.bind('change', function(event) {
                event.preventDefault();
                scope.onSuccess({event: event.originalEvent || event});
                $rootScope.$apply();
            });

            element = element.length ? element[0] : element;

            for (key in attrs.$attr){
                value = attrs.$attr[key];
                element.setAttribute(value, attrs[key]);
            }

            filepickerService.constructWidget(element);
        }
    };
}