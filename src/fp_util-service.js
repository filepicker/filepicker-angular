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
