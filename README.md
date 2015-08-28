# angular-filepicker
Filepicker library for AngularJS. It is simple wrapper of filepicker [JS library](https://api.filepicker.io/v2/filepicker.js).


## Usage
* Include filepicker.js script [v2](https://api.filepicker.io/v2/filepicker.js) or [v1](https://api.filepicker.io/v1/filepicker.js)
* Include angular-filepicker script with bower: ```bower install angular-filepicker``` OR simply copy script from dist directory.
* Add ```'angular-filepicker'``` module as dependency for your angular app. Example:
```
angular.module('angularFilepickerExample', ['ngRoute', 'angular-filepicker'])
```
* Set apikey. If you dont have one - register free account [here](https://www.filepicker.com/register/free). Setting key is possible in 3 ways:
- use ```filepickerProvider.setKey```  method. This way key will be set in configuration phase.
```
angular.module('angularFilepickerExample')
.config(function (filepickerProvider) {
    filepickerProvider.setKey('yourAPIKEY');
});
```
- use ```filepickerService.setKey```  method.
- use ```data-fp-apikey``` directive attribute.

* You can access angular-filepicker by ```filepicker``` directive or ```filepickerService```


## Features

### ```filepickerService```
filepickerService is wrapper on ```window.filepicker``` global. Avaliable methods: ```setKey, pick, pickFolder, pickMultiple, pickAndStore, read, write, writeUrl, export, processImage, store, storeUrl, stat, metadata, remove, convert, constructWidget, makeDropPane```. See detailed [docs](https://www.filepicker.com/documentation/file_ingestion/javascript_api/pick?v=v2)

Example of using service in the controller:
```
angular.module('angularFilepickerExample')
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
});
```

### ```filepicker``` directive
It allows you to use filepicker widgets in angular templates. It support all attributes from the [docs](https://www.filepicker.com/documentation/file_ingestion/widgets/pick?v=v2), the only diffrence is use of ```on-success``` instead of ```onchage```. Directive restricts attribute mode. 
Avaliable widtet types: ```filepicker```, ```filepicker-dragdrop```, ```filepicker-convert```.

Example: 

``` 
<input filepicker type="filepicker-dragdrop" data-fp-services="computer,facebook,dropbox,box" on-success="onSuccess(event.fpfile)" />;
```

### ```fpConvert``` filter
Give nice an easy way to benefit from filepicker images conversion. Usefull if you need thumbnail or crop image. 
Example (image resized to width=200)

``` 
<img ng-src="{{filepickerLink | fpConvert: {w:200} }}">
``` 
Other conversion options:
* Resizing,
* fitting and aligning Cropping
* Watermarking Formatting, 
* compression and quality 
* Rotating
* Adding filters 

Detailed [docs](https://www.filepicker.com/documentation/file_processing/image_conversion/image)

## Demo
Demo avaliable in the /demo directory.
To run demo on localhost:
``` 
npm install
npm serve
``` 

Local server will be launched http://localhost:8080/demo/

## Contributing
Contributing welcomed. To build dist run:
``` 
npm install
npm build
``` 
## License
MIT


