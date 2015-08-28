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
