angular.module('angular-filepicker')
.service('filepickerService',filepickerService);

function filepickerService($window){
    return $window.filepicker;
}
