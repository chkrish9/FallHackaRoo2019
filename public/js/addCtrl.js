var app = angular.module("eduLerApp", []);

app.controller("addCtrl", function ($scope, $http, $window) {
    $scope.isDev = false;
    $scope.url = "";
    $scope.model = {
        "location": "",
        "animation": false,
        "scale": "",
        "name": "",
        "thumbnail": "",
        "published": false
    };
    $scope.filename = "";
    $scope.init = function () {
        if ($scope.isDev) {
            $scope.url = "http://localhost:3000/";
        } else {
            $scope.url = "https://fallhackathon19.herokuapp.com/";
        }
        console.log($scope.model);
    }

    $scope.addModel = function () {
        console.log($scope.model);
        $http({
            method: 'POST',
            url: $scope.url + "create",
            headers: { "Content-Type": "application/json" },
            data: $scope.model
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.clear();
        }, function errorCallback(response) {
            console.log(response);
        });
    }
   $scope.uploadFile = function(){

        var file = $scope.myFile;
        var uploadUrl = "/multer";
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function successCallback(response) {
            console.log(response.data);
            let data = response.data;
            $scope.model.thumbnail = "./images/"+data.filename;
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    $scope.clear = function () {
        $scope.model = {
            "location": "",
            "animation": false,
            "scale": "",
            "name": "",
            "thumbnail": "",
            "published": false
        }
    }
    $scope.init();
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
    
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
    }]);