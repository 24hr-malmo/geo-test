(function() {


    var POIs = [
        {
            id: "geo-item-1",
            name: "24HR",
            coords: {
                lat: 55.60409,
                long: 12.99868
            }
        }, {
            id: "geo-item-2",
            name: "Stortorget, Malmö", 
            coords: {
                lat: 55.60646,
                long: 12.99991
            }
        }, {
            id: "geo-item-3",
            name: "Mattias", 
            coords: {
                lat: 55.52513,
                long: 12.93840
            }
        }
    ];

    var domLoaded = false;

    if (!domLoaded) {
        document.addEventListener("DOMContentLoaded", function() {
            domLoaded = true;
            init();
        }, false);
    } else {
        init();
    }


    function calculateDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var radlon1 = Math.PI * lon1/180;
        var radlon2 = Math.PI * lon2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344 * 1000;
        return dist;
    }

    function init() {

        var geoDom = document.querySelector("#geo-coordinate");

        var geoContainer = document.querySelector("#geo-container");

        for(var i = 0, ii = POIs.length; i < ii; i++){ 
            var POI = POIs[i];
            var domItem = document.createElement("div");
            domItem.classList.add("geo-item");
            domItem.id = POI.id;
            domItem.innerHTML = '<div class="name"></div> <div class="pos"></div> <div class="distance"></div>';
            domItem.querySelector(".name").innerHTML = POI.name;
            domItem.querySelector(".pos").innerHTML = POI.coords.lat + ", " + POI.coords.long;
            domItem.querySelector(".distance").innerHTML = "n/a";
            geoContainer.appendChild(domItem);
        }


        function useGeo(position) {

            for(var i = 0, ii = POIs.length; i < ii; i++){ 
                var POI = POIs[i];
                var distance = calculateDistance(position.coords.latitude, position.coords.longitude, POI.coords.lat, POI.coords.long);
                var domItem = document.querySelector("#" + POI.id);
                if (distance < 20) {
                    domItem.classList.add("active");
                } else {
                    domItem.classList.remove("active");
                }
                domItem.querySelector(".distance").innerHTML = distance.toFixed(0) + "m";
            }

            geoDom.innerHTML = position.coords.latitude + ", " + position.coords.longitude;

            setTimeout(function() {
                navigator.geolocation.getCurrentPosition(useGeo);
            }, 200);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(useGeo);
        } else {
            geoDom.innerHTML = "Geolocation is not supported by this browser.";
        }

    }


})();
