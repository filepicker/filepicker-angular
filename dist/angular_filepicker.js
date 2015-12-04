'use strict';
angular.module('angular-filepicker',[]);

window.filepicker = window.filepicker || {};
window.filepicker.plugin = 'angular_js_lib';'use strict';

angular.module('angular-filepicker')
.directive('filepicker', filepickerDirective);

function filepickerDirective($rootScope, filepickerService, $parse){
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
}'use strict';

angular.module('angular-filepicker')
.provider('filepicker', function() {

    this.$get = function(){
        return window.filepicker;
     };

    this.setKey = function(key) {
        try {
            window.filepicker.setKey(key);
        } catch(err) {
            console.error('Include filepicker.js script');
        }
    };
});
angular.module('angular-filepicker')
.service('filepickerService',filepickerService);

function filepickerService($window){
    return $window.filepicker;
}
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
                    url = url.replace('api/file/', 'api/preview/');
                }
                iframe.src = url;
            }
        }
    };
};


'use strict';

angular.module('angular-filepicker')
.service('fpUtilService', fpUtilService);

function fpUtilService(){
    return {
        toParams: toParams,
        serialize: serialize
    };

    function toParams(obj) {
        var pairs = [];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                pairs.push(serialize(obj[prop]));
                continue;
            }
            pairs.push(prop + '=' + obj[prop]);
        }
        return pairs.join('&');
    }

    // passed data  converted to a URL-encoded string
    function serialize(obj) {
        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    }
};
'use strict';

angular.module('angular-filepicker')
.filter('fpConvert', fpConvert);

function fpConvert($filter, fpUtilService){
    return function (value, convertOptions) {
        var originalUrl = $filter('fpUrlFilter')(value);
        if (!originalUrl || !convertOptions){
            return;
        }
        return originalUrl + '/convert?' + fpUtilService.toParams(convertOptions);
    };
}
angular.module('angular-filepicker')
.filter('fpUrlFilter', function(){
    return function(input){
        if (!input){
            return '';
        }
        var endpoints = ['/convert', '/metadata', '?'];
        for (var i in endpoints) {
            var index = input.indexOf(endpoints[i]);
            if (index > -1) {
                return input.substr(0, index);
            }
        }
        return input;
    };
});

