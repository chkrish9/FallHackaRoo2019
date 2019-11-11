var app = angular.module("eduLerApp", []);

app.controller("arCtrl", function ($scope, $window) {
    $scope.isDev = false;
    $scope.url = "";

    $scope.init = function () {
        if ($scope.isDev) {
            $scope.url = "http://localhost:3000/";
        } else {
            $scope.url = "https://fallhackathon19.herokuapp.com/";
        }
        $scope.populate();
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
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('../service-worker.js');
            });
            function updateOfflineMsg(event) {
                $scope.offline = true;
            }
            function updateOnlineMsg(event) {
                $scope.offline = false;
            }
            window.addEventListener('online',  updateOnlineMsg);
            window.addEventListener('offline', updateOfflineMsg);
        }

    }

    $scope.goBack=function(){
        window.location.href="index.html";
    }
    $scope.populate = function () {
        let loc = localStorage.getItem("location");
        let ani = localStorage.getItem("animation");
        let scale = localStorage.getItem("scale");
        $("#animated-asset").attr("src", loc);
        var html = "<a-entity"
        if (ani === "true")
            html += " animation-mixer='loop:repeat'";
        html += " id='animated-model'" +
            " gltf-model='#animated-asset'" +
            " scale='" + scale + "'>" +
            "</a-entity>";
        $("#animated-marker").html("");
        $("#animated-marker").html(html);
    }

  

    $scope.init();
});