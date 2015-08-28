'use strict';

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
