(function() {

    var POIs = [/*
        { id: "geo-item-1", name: "Utanfør Tinne & Co", coords: { lat: 55.974315, long: 12.420044 } }, 
        { id: "geo-item-2", name: "Away on the Cykelstig", coords: { lat: 55.974879, long: 12.418767 } }, 
        { id: "geo-item-3", name: "Skolens Parkering", coords: { lat: 55.965251, long: 12.420532 } },
        { id: "geo-item-4", name: "Matematiskt Spørgsmål", coords: { lat: 55.964056, long: 12.420881} },
        { id: "geo-item-5", name: "Spørgsmål på Dansk", coords: { lat: 55.963083, long: 12.419915} },
        { id: "geo-item-6", name: "Bonusquestion", coords: { lat: 55.963705, long: 12.418665} },
        { id: "geo-item-7", name: "24HR", coords: { lat: 55.604068, long: 12.998663} },
        { id: "geo-item-8", name: "Hovedbanegården Kbh", coords: { lat: 55.673253, long: 12.564132 }},
        { id: "geo-item-9", name: "Geometri", coords: { lat: 55.666128, long: 12.091993 }},
        { id: "geo-item-10", name: "Syre og base", coords: { lat: 55.666893, long: 12.095330}},
        { id: "geo-item-11", name: "Stedord", coords: { lat: 55.667268, long: 12.090535}} */
    ];

    var _id = location.search.replace(/^.*?\=/, '');
    var domLoaded = false;
    var checkGeo = -1;

    if (!domLoaded) {
        document.addEventListener("DOMContentLoaded", function() {
            domLoaded = true;

            jQuery.get("http://localhost/geotest/wordpress/",function (data) {
                               
                for (var i = 0; i < data[_id].length; i++) {
                    POIs.push(data[_id][i]);

                };
                init();
            });   



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
        var noGeo = document.querySelector("#no-geo");

        var geoContainer = document.querySelector("#geo-container");
        document.getElementById("title").innerHTML = POIs[0].title;
        for(var i = 0, ii = POIs.length; i < ii; i++){ 
            var POI = POIs[i];
            var domItem = document.createElement("div");
            domItem.classList.add("geo-item");
            domItem.id = POI.id;
            domItem.innerHTML = '<div class="name"></div><div class="pos"></div> <div class="distance"></div><div class="question"></div><form action="">Ditt svar:<input id="answer" type="text" name="answer"</form><input type="submit" value="Skicka"> ';
            domItem.querySelector(".name").innerHTML = POI.name;           
            domItem.querySelector(".question").innerHTML = POI.question;
            domItem.querySelector(".pos").innerHTML = POI.coords.lat + ", " + POI.coords.long;
            domItem.querySelector(".distance").innerHTML = "n/a";
            geoContainer.appendChild(domItem);
        }
        jQuery("form").submit(function(e){
            e.preventDefault();
            this.innerHTML = "Ditt svar: "+jQuery('#answer').val();


        });

        function useGeo(position) {

            clearTimeout(checkGeo);
            noGeo.classList.remove("show");

            for(var i = 0, ii = POIs.length; i < ii; i++){ 
                var POI = POIs[i];
                var distance = Math.round(calculateDistance(position.coords.latitude, position.coords.longitude, POI.coords.lat, POI.coords.long));
                var domItem = document.querySelector("#" + POI.id);
                if (distance <= 8) {
                    domItem.classList.add("active");
                    domItem.querySelector(".question").classList.add("active");
                    domItem.querySelector("form").classList.add("active")
                } else {
                    domItem.querySelector(".question").classList.remove("active");
                    domItem.classList.remove("active");
                    domItem.querySelector("form").classList.remove("active")
                }
                domItem.querySelector(".distance").innerHTML = distance + "m";
            }

            geoDom.innerHTML = position.coords.latitude + ", " + position.coords.longitude;

            setTimeout(function() {
                navigator.geolocation.getCurrentPosition(useGeo);
            }, 200);

        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(useGeo);
            checkGeo = setTimeout(function() {
                noGeo.classList.add("show");
            }, 4000);
        } else {
            geoDom.innerHTML = "Geolocation is not supported by this browser.";
            noGeo.classList.add("show");
        }

    }


})();
