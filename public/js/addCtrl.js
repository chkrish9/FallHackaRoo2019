var app = angular.module("eduLerApp", []);

app.controller("addCtrl", function ($scope, $http, $window) {
    $scope.isDev = true;
    $scope.url = "";
    $scope.model = {
        "location": "",
        "animation": false,
        "scale": "",
        "name": "",
        "thumbnail": "",
        "published": false
    }
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
            url: $scope.url+"create",
            headers: {"Content-Type": "application/json"},
            data:  $scope.model
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.clear();
        }, function errorCallback(response) {
            console.log(response);
        });
    }
  
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