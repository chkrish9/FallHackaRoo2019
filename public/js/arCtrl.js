var app = angular.module("eduLerApp", []);

app.controller("arCtrl", function ($scope, $window) {
    $scope.isDev = false;
    $scope.url = "";

    $scope.init = function () {
        if ($scope.isDev) {
            $scope.url = "http://localhost:3002/";
        } else {
            $scope.url = "https://fallhackathon19.herokuapp.com/";
        }
        $("#animated-model1").attr("visible", false);
        AFRAME.registerComponent('markerhandler', {
            init: function () {
                // const animatedMarker = document.querySelector("#animated-marker");
                // const aEntity = document.querySelector("#animated-model");

                // // every click, we make our model grow in size :)
                // animatedMarker.addEventListener('click', function(ev, target){
                //     const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
                //     if (aEntity && intersectedElement === aEntity) {
                //         const scale = aEntity.getAttribute('scale');
                //         Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                //         aEntity.setAttribute('scale', scale);
                //     }
                // });
            }
        });

    }

    $scope.openSearch = function () {
        var html = "<a-entity" +
            " animation-mixer='loop:repeat'" +
            " id='animated-model'" +
            " gltf-model='#animated-asset'" +
            " scale='2 2 2'>" +
            "</a-entity>";
        $("#animated-marker").html("");
        $("#animated-marker").html(html);
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

    $scope.init();
});