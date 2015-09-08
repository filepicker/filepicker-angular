'use strict';

angular.module('angularFilepickerExample', ['ngRoute', 'angular-filepicker'])
.config(function ($routeProvider, filepickerProvider) {
    filepickerProvider.setKey('AwMr7Yc2nQX2zdOcs5Q1Az');

    $routeProvider
    .when('/', {
        templateUrl: 'templates/examples.html',
        controller: 'ExamplesCtrl'
    })
    .when('/gallery', {
        templateUrl: 'templates/gallery.html',
        controller: 'GalleryCtrl'
    })
    .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'GalleryCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
})
.controller('GalleryCtrl', function ($scope, filepickerService, $window) {
    $scope.files = JSON.parse($window.localStorage.getItem('files') || '[]');

    $scope.pickFile = pickFile;

    $scope.onSuccess = onSuccess;

    function pickFile(){
        filepickerService.pick(
            {mimetype: 'image/*'},
            onSuccess
        );
    };

    function onSuccess(Blob){
        $scope.files.push(Blob);
        $window.localStorage.setItem('files', JSON.stringify($scope.files));
    };
})
.controller('ExamplesCtrl', function ($scope, filepickerService, $window) {
    $scope.fpConvertExamples = [
        "{{'https://www.filepicker.io/api/file/qHi4LxRh28IeEBdJcFpw' | fpConvert: {w:200} }}",
        "{{'https://www.filepicker.io/api/file/qHi4LxRh28IeEBdJcFpw' | fpConvert: {crop:100,100,300,300} }}",
        "{{'https://www.filepicker.io/api/file/qHi4LxRh28IeEBdJcFpw' | fpConvert: {filter:'sharpen',w: 250} }}",
    ];

    $scope.previewUrls = [
        'https://www.filepicker.io/api/file/L78eRqmFQYuZoozoddbX',
        'https://www.filepicker.io/api/file/k4MtpaPCRBGhzirfsxK6',
        'https://www.filepicker.io/api/file/nHZO4WqdQfWkHallRrff'
    ];

    $scope.previewUrlExample = $scope.previewUrls[0];
});
