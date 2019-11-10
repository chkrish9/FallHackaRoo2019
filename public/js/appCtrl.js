var app = angular.module("eduLerApp", []);

app.controller("appCtrl", function ($scope, $window) {
    $scope.isDev = false;
    $scope.url = "";
     
    $scope.init = function () {
        if ($scope.isDev) {
            $scope.url = "http://localhost:3002/";
        } else {
            $scope.url = "https://fallhackathon19.herokuapp.com/";
        }
        // $http.get($scope.url + "getTop")
        //     .then(function (response) {
        //         $scope.results = response.data;
        //     });
        // if (!$scope.dialog.showModal) {
        //     dialogPolyfill.registerDialog($scope.dialog);
        // }
        // if ('serviceWorker' in navigator) {
        //     window.addEventListener('load', function () {
        //         navigator.serviceWorker.register('../service-worker.js');
        //     });
        //     function updateOfflineMsg(event) {
        //         $scope.offline = true;
        //     }
        //     function updateOnlineMsg(event) {
        //         $scope.offline = false;
        //     }
        //     window.addEventListener('online',  updateOnlineMsg);
        //     window.addEventListener('offline', updateOfflineMsg);
        // }
        $("#animated-model1").attr("visible",false);
        AFRAME.registerComponent('markerhandler', {

            init: function() {
                const animatedMarker = document.querySelector("#animated-marker");
                const aEntity = document.querySelector("#animated-model");
        
                // every click, we make our model grow in size :)
                animatedMarker.addEventListener('click', function(ev, target){
                    const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
                    if (aEntity && intersectedElement === aEntity) {
                        const scale = aEntity.getAttribute('scale');
                        Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                        aEntity.setAttribute('scale', scale);
                    }
                });
        }});

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