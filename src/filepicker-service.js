angular.module('angular-filepicker')
.service('filepickerService',filepickerService);

function filepickerService($window){
    return $window.filepicker;
}


angular.module('angular-filepicker')
.provider('angularFilepicker', function() {

    this.$get = function(){
        return window.filepicker;
     };

    this.setKey = function(key) {
        this.key = key;
    };
});