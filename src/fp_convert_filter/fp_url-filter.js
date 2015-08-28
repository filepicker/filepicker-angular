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

