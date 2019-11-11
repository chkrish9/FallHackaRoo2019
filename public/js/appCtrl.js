var app = angular.module("eduLerApp", []);

app.controller("appCtrl", function ($scope, $window) {
    $scope.isDev = false;
    $scope.url = "";
    $scope.models = [
        {
            "location":"models/solar6.glb",
            "animation":"true",
            "scale":"2 2 2",
            "name":"Solar",
            "_id":0
        },
        {
            "location":"https://raw.githubusercontent.com/prashant-andani/3d-models/master/axe/scene.gltf",
            "animation":"false",
            "scale":"0.1 0.1 0.1",
            "name":"Axe",
            "_id":1
        },
        {
            "location":"https://raw.githubusercontent.com/prashant-andani/3d-models/master/cow/scene.gltf",
            "animation":"false",
            "scale":"0.1 0.1 0.1",
            "name":"Cow",
            "_id":2
        }
    ]; 
    $scope.init = function () {
        if ($scope.isDev) {
            $scope.url = "http://localhost:3000/";
        } else {
            $scope.url = "https://fallhackathon19.herokuapp.com/";
        }
        
        // localStorage.setItem("location","models/solar6.glb");
        // localStorage.setItem("animation","true");
        // localStorage.setItem("scale","2 2 2");
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
    }

    $scope.navigateToAR =function(id){
        let model = $scope.models[id];
        localStorage.setItem("location",model.location);
        localStorage.setItem("animation",model.animation);
        localStorage.setItem("scale",model.scale);
        window.location.href="ar.html";
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