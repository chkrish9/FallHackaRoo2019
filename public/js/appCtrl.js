var app = angular.module("eduLerApp", []);

app.controller("appCtrl", function ($scope, $http, $window) {
    $scope.isDev = false;
    $scope.url = "";
    $scope.models = [];
    $scope.init = function () {
        if ($scope.isDev) {
            $scope.url = "http://localhost:3000/";
        } else {
            $scope.url = "https://fallhackathon19.herokuapp.com/";
        }

        $http.get($scope.url + "getall")
            .then(function (response) {
                $scope.models = response.data;
            });
    }

    $scope.navigateToAR = function (model) {
        localStorage.setItem("location", model.location);
        localStorage.setItem("animation", model.animation);
        localStorage.setItem("scale", model.scale);
        window.location.href = "ar.html";
    }
    $scope.openSearch = function () {
        $scope.dialog.showModal();
    }

    $scope.search = function () {
        if ($scope.age === "" && $scope.max_players === "" && $scope.avg_time === "" && $scope.category === "") {
            $scope.dialog.close();
        }
        else {
            $http.get($scope.url + "search?category=" + $scope.category + "&max_players=" + $scope.max_players + "&avg_time=" + $scope.avg_time + "&age=" + $scope.age)
                .then(function (response) {
                    console.log(response.data);
                    $scope.results = response.data;
                    $scope.age = "";
                    $scope.max_players = "";
                    $scope.avg_time = "";
                    $scope.category = "";
                    $scope.dialog.close();
                });
        }
    }

    $scope.cancel = function () {
        $scope.dialog.close();
    }
    $scope.init();
});