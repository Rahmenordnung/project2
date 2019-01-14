
            
            
            
            queue()
                .defer(d3.csv, "/data/sales.csv")
                .await(makeGraphs);

            function makeGraphs(error, SALESData) {
                var ndx = crossfilter(SALESData)

               








                amount_causes(ndx);
                show_gender_balance(ndx);
                state_status(ndx);
                country_pie(ndx);
                sales_month(ndx);
                scatter_price(ndx);
                show_Status_products(ndx);
                show_territory_donuts(ndx);
               



                dc.renderAll();








                function amount_causes(ndx) {
                    var dim = ndx.dimension(dc.pluck("ORDERDATE"));
                    var group = dim.group();

                    dc.selectMenu("#dead-selector")
                        .dimension(dim)
                        .group(group);
                }


                function show_gender_balance(ndx) {
                    var dim = ndx.dimension(dc.pluck("MONTH_ID"));
                    var group = dim.group();

                    dc.barChart("#chart-here")
                        .width(500)
                        .height(500)
                        .margins({ top: 10, right: 50, bottom: 60, left: 80 })
                        .dimension(dim)
                        .group(group)
                        .transitionDuration(500)
                        .x(d3.scale.ordinal().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
                        .xUnits(dc.units.ordinal)
                        .elasticY(true)
                        .xAxisLabel("COUNTRY")
                        .renderHorizontalGridLines(true)
                        .on('renderlet', function(chart) {
                            chart.selectAll("g.x text")
                                .attr('dx', '-15')
                                .attr('transform', "rotate(-45)");
                        })
                        .addFilterHandler(function(filters, filter) { return [filter]; })
                        .yAxis().ticks(20);


                }



                function country_pie(ndx) {
                    var dim = ndx.dimension(dc.pluck("COUNTRY"));
                    var group = dim.group();


                    dc.pieChart('#country_pie')
                        .width(500)
                        .radius(200)
                        .transitionDuration(1000)
                        .dimension(dim)
                        .group(group)
                        .legend(dc.legend().x(420).y(0).itemHeight(9).gap(1));


                }





                function sales_month(ndx) {




                    var QTR_ID_dim = ndx.dimension(dc.pluck("QTR_ID"));
                    var total_sales_flow = QTR_ID_dim.group();

                    var minORDERDATE = QTR_ID_dim.bottom(1)[0].QTR_ID;
                    var maxORDERDATE = QTR_ID_dim.top(1)[0].QTR_ID;

                    dc.lineChart("#sales_month")
                        .width(1000)
                        .height(300)
                        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
                        .dimension(QTR_ID_dim)
                        .group(total_sales_flow)
                        .transitionDuration(500)
                        .x(d3.time.scale().domain([minORDERDATE, maxORDERDATE]))
                        .xAxisLabel("Flow-Sale")
                        .yAxis().ticks(4);



                }

                function state_status(ndx) {

                    var name_dim = ndx.dimension(dc.pluck('YEAR_ID'));
                    var SALESByPRODUCTLINEClassic = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Classic Cars') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var SALESByPRODUCTLINEVintage = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Vintage Cars') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var SALESByPRODUCTLINEMotorcycles = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Motorcycles') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var SALESByPRODUCTLINETrucks = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Trucks and Buses') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var SALESByPRODUCTLINEPlanes = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Planes') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var SALESByPRODUCTLINEShips = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Ships') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var SALESByPRODUCTLINETrains = name_dim.group().reduceSum(function(d) {
                        if (d.PRODUCTLINE === 'Trains') {
                            return +d.SALES;
                        }
                        else {
                            return 0;
                        }
                    });
                    var stackedChart = dc.barChart("#sales_per_state_and_situation");
                    stackedChart
                        .width(500)
                        .height(500)
                        .margins({ top: 25, right: 50, bottom: 60, left: 80 })
                        .dimension(name_dim)
                        .group(SALESByPRODUCTLINEClassic, "Classic Cars")
                        .stack(SALESByPRODUCTLINEVintage, "Vintage Cars")
                        .stack(SALESByPRODUCTLINEMotorcycles, "Motorcycles")
                        .stack(SALESByPRODUCTLINETrucks, "Trucks and Buses")
                        .stack(SALESByPRODUCTLINEPlanes, "Planes")
                        .stack(SALESByPRODUCTLINEShips, "Ships")
                        .stack(SALESByPRODUCTLINETrains, "Trains")
                        .x(d3.scale.ordinal())
                        .xUnits(dc.units.ordinal)
                        .xAxisLabel("PRODUCTLINE")
                        .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
                    stackedChart.margins().right = 100;
                    dc.renderAll();


                }

                function scatter_price(ndx) {



                    var QUANTITYORDEREDDim = ndx.dimension(function(d) {
                        return d.QUANTITYORDERED;
                    });
                    var STATUSColors = d3.scale.ordinal()
                        .domain(["Shipped", "Cancelled", "In Process", "Disputed", "On Hold", "Resolved"])
                        .range(["red", "green", "blue", "yellow", "violet", "brown"]);
                    var minQUANTITYORDERED = QUANTITYORDEREDDim.bottom(1)[0].QUANTITYORDERED;
                    var maxQUANTITYORDERED = QUANTITYORDEREDDim.top(1)[0].QUANTITYORDERED;
                    var SALESDim = ndx.dimension(function(d) {
                        return [d.QUANTITYORDERED, d.SALES, d];
                    });
                    var SALESGroup = SALESDim.group();
                    var spend_chart = dc.scatterPlot("#price_along_dates");
                    spend_chart
                        .width(1068)
                        .height(500)
                        .x(d3.time.scale().domain([minQUANTITYORDERED, maxQUANTITYORDERED]))
                        .brushOn(false)
                        .symbolSize(8)
                        .clipPadding(10)
                        .yAxisLabel("Amount Spent")
                        .title(function(d) {
                            return d.key[2].CUSTOMERNAME + " quatity ordered: " + d.key[2].QUANTITYORDERED + " in store " + d.key[2].CITY;
                        })
                        .colorAccessor(function(d) {
                            return d.key[2].STATUS;
                        })
                        .mouseZoomable(true)
                        .colors(STATUSColors)
                        .dimension(SALESDim)
                        .group(SALESGroup);

                    dc.renderAll();
                }















                function initMap() {
                    var map = new google.maps.Map(document.getElementById('Map'), {

                        zoom: 6,
                        center: new google.maps.LatLng(53.3497645, -6.2602732),
                        mapTypeId: 'terrain',
                        scrollwheel: true,
                        draggable: true,
                        mapTypeId: google.maps.MapTypeId.HYBRID,

                    });


                    var labels = "ABCDEFGHIJKLMONPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz";
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






                function show_territory_donuts(ndx) {
                    var dim = ndx.dimension(dc.pluck("TERRITORY"));
                    var group = dim.group();


                    dc.pieChart('#donuts')
                        .width(500)
                        .radius(400)
                        .innerRadius(50)
                        .transitionDuration(1000)
                        .dimension(dim)
                        .group(group)








                }

                function show_Status_products(ndx) {
                    var dim = ndx.dimension(dc.pluck("STATUS"));
                    var group = dim.group();

                    dc.barChart("#USA_clients")
                        .width(250)
                        .height(400)
                        .margins({ top: 10, right: 10, bottom: 60, left: 40 })
                        .dimension(dim)
                        .group(group)
                        .transitionDuration(500)
                        .x(d3.scale.ordinal())
                        .xUnits(dc.units.ordinal)
                        .elasticY(true)
                        .xAxisLabel("Status")
                        .renderHorizontalGridLines(true)
                        .on('renderlet', function(chart) {
                            chart.selectAll("g.x text")
                                .attr('dx', '-15')
                                .attr('transform', "rotate(-45)");
                        })
                        .addFilterHandler(function(filters, filter) { return [filter]; })
                        .yAxis().ticks(10);


                }

            }
            
            
          
            
           