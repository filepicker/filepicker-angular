'use strict';

angular.module('angular-filepicker')
.provider('filepicker', function() {

    this.$get = function(){
        return window.filepicker;
     };

    this.setKey = function(key) {
        this.key = key;
    };
});