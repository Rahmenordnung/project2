

        function initMap() {
            var map = new google.maps.Map(document.getElementById('Map'), {

                zoom: 6,
                center: new google.maps.LatLng(53.3497645, -6.2602732),
                mapTypeId: 'terrain',
                scrollwheel: true,
                draggable: true,
                mapTypeId: google.maps.MapTypeId.HYBRID,

            });


            var labels = "ABCDEFGHIJKLMONPQRSTUVWXYZabcdefgijklmnopqrstuvwxyzA1,";
            var locations = [{
                lat: 40.4938993, //Madrid, mora//
                lng: -3.712306099999978
            }, {
                lat: 48.829985, //Paris Colonel//
                lng: 2.275914
            }, {
                lat: 49.26528, //Reims
                lng: 4.84139
            }, {
                lat: 50.63194, //Lille
                lng: 3.0575
            }, {
                lat: 48.871153, //Paris , lauriston
                lng: 2.292015
            }, {
                lat: -37.854614, //Melburne, St Kilda
                lng: 144.98112
            }, {
                lat: 43.0467, //Newarl, NY
                lng: -77.0953
            }, {
                lat: 60.169018, //Helsinki, Kes
                lng: 24.94287
            }, {
                lat: 47.8, //salzburg//
                lng: 13.03333
            }, {
                lat: 41.6362, //New Bedford
                lng: -70.9342
            }, {
                lat: 49.262785, //Vancuver
                lng: -123.126615
            }, {
                lat: 34.954548, //Tokyo
                lng: 137.17844
            }, {
                lat: -27.47665, //Brisbane
                lng: 153.01667
            }, {
                lat: 45.015025, //Torino
                lng: 7.6665910000000395
            }, {
                lat: 37.9735346, //San Rafael
                lng: -122.53108739999999
            }, {
                lat: 34.1240033, //Hillside Pasadena
                lng: -118.1596495
            }, {
                lat: 37.5841, //Burlingame
                lng: -122.36608
            }, {
                lat: 60.3898141, //Sentrum Bergen
                lng: 5.333338899999944
            }, {
                lat: 41.53493074850934, //Bridgewater
                lng: -73.36567498423443
            }, {
                lat: 42.3736158, //Cambridge MA
                lng: -71.1097335
            }, {
                lat: 63.429190, //Stavern Norway
                lng: 10.389140
            }, {
                lat: 40.611060, //Allentown,PA
                lng: -75.473720
            }, {
                lat: -33.795840, //Chartswood, Aistralia
                lng: 151.178460
            }, {
                lat: 47.215780, //Nantes, Feance
                lng: -1.556430
            }, {
                lat: 53.367830, // Liverpool, UK
                lng: -2.924340
            }, {
                lat: 65.584160, // Lulea? Sweden
                lng: 22.154750
            }, {
                lat: 40.4604321, //Madrid, Araquil
                lng: -3.7799046999999746
            }, {
                lat: 1.289440, //Singapore
                lng: 103.849980
            }, {
                lat: 40.766600, //NYC Pompton 
                lng: -73.944990
            }, {
                lat: 40.0115, //Philadelphia first
                lng: -75.1327
            }, {
                lat: 45.75889, //Lyon rue du commerce
                lng: 4.84139
            }, {
                lat: 34.1816, //Burbank Furth
                lng: -118.3259
            }, {
                lat: 41.3082, //New Haven CT
                lng: -72.9251
            }, {
                lat: 42.2445, //Cambridge MA
                lng: -71.812
            }, {
                lat: 57.723276, //Boras, Sweeden
                lng: 12.944913
            }, {
                lat: 48.803333, //Versailles
                lng: 2.130576
            }, {
                lat: 42.7654, //Nashua, NH
                lng: -71.4676
            }, {
                lat: -33.836399, //North Sydney
                lng: 151.207766
            }, {
                lat: 45.49, //Montreal , Quebec
                lng: -73.69
            }, {
                lat: 34.699, //Osaka Japon
                lng: 135.4927
            }, {
                lat: 47.21722, //Nantes Rue Royale
                lng: -1.55389
            }, {
                lat: 41.032, //White PLains NY
                lng: -73.7654
            }, {
                lat: 55.781327, //Kobenhavn
                lng: 12.177226
            }, {
                lat: 51.475913, //London King
                lng: -0.009098
            }, {
                lat: 43.604048, // Toulouse,
                lng: 1.44559
            }, {
                lat: 51.513924, // Hannover square London
                lng: -0.14234
            }, {
                lat: 41.390102, //Barcelona Cataluna
                lng: 2.164708
            }, {
                lat: 34.0544, //Douglas Avenue LA,CA
                lng: -118.2439
            }, {
                lat: 32.7174, //San Diego, Furth
                lng: -117.1628
            }, {
                lat: 50.806910, //Bruxelles
                lng: 4.332920
            }, {
                lat: 49.007812, //Tsawassen BC
                lng: -123.09237
            }, {
                lat: 50.7595, //Isle of Wight
                lng: -1.3002
            }, {
                lat: 37.369820,
                lng: -121.903840 //Ingle LN, SAn JOse
            }, {
                lat: 48.858149, // Charonne Paris
                lng: 2.390848
            }, {
                lat: 42.3605, //Boston Ingle
                lng: -71.0596
            }, {
                lat: 1.333760, //Singapore Sandtown
                lng: 103.801950
            }, {
                lat: 14.556190, //Philippines
                lng: 121.061870
            }, {
                lat: 43.350930, //Marseille
                lng: 5.439200
            }, {
                lat: 50.973450, //Koln
                lng: 6.946990
            }, {
                lat: 46.212530, //Sweiss
                lng: 6.116300
            }, {
                lat: 44.745220, //Regio Emilia
                lng: 10.605790
            }, {
                lat: 50.079210, //Frankfurt am Main
                lng: 8.623840
            }, {
                lat: 60.205620, //Espoo
                lng: 24.655360
            }, {
                lat: 40.102900, //Hillside
                lng: -78.548990
            }, {
                lat: 53.335380, //Dublin
                lng: -6.249470
            }, {
                lat: 40.472180, //Madrid merchants
                lng: -3.780890
            }, {
                lat: 53.480060, //Manchester
                lng: -2.234790
            }, {
                lat: 56.181770, //Aaarthus
                lng: 10.209010
            }, {
                lat: 47.065490, //Graz
                lng: 15.469180
            }, {
                lat: 35.060890, //Glendale,CA
                lng: -118.203880
            }, {
                lat: 37.408010, //Sevilla
                lng: -5.972450
            }, {
                lat: 65.009930, //Oulu
                lng: 25.464740
            }, {
                lat: 45.694889, //Bergamo
                lng: 9.669975
            }, {
                lat: -37.887650, //Victoria, Austlaria
                lng: 145.161900
            }, {
                lat: 36.023580, //Las Vegas NV
                lng: -115.024710
            }, {
                lat: 48.587110, //Strassbourg
                lng: 7.741110
            }, {
                lat: 59.913010, //Oslo Drammensveien
                lng: 10.734600
            }, {
                lat: 48.132130, //München
                lng: 11.517390
            }, {
                lat: 50.406860, //Charleroi
                lng: 4.445900
            }];
            var markers = locations.map(function(location, i) {
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                });
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        }