'use strict';

angular.module('angular-filepicker')
.directive('filepickerPreview', filepickerPreviewDirective);

function filepickerPreviewDirective($rootScope, filepickerService){

	return {
        restrict: 'A',
        scope:{
            url: '=',
        },
        link: function(scope, element, attrs) {
            var url = scope.url;

            var iframe = document.createElement('iframe');
            iframe.src = url;

            /* Set full size so it gets size from parrent element  */

            iframe.width = '100%';
            iframe.height = '100%';
            angular.element(element).append(iframe);

            scope.$watch('url', setUrl);

            function setUrl(url){
                if (!url) {    
                    return; 
                } else {
                    // Support filestack urls that do not contain 'api/file'
                    if (url.indexOf('api/file/') == -1) {
                        var parser = document.createElement('a');
                        parser.href = url;
                        parser.pathname = '/api/file' + parser.pathname;
                        url = parser.href;
                    }
                    url = url.replace('api/file/', 'api/preview/');
                }
                iframe.src = url;
            }
        }
    };
};


