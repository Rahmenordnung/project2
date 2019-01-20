queue()
    .defer(d3.csv, "data/sales.csv")
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
    Tabletry(ndx);

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
    
    function Tabletry(ndx) {
        var dim = ndx.dimension(dc.pluck("ORDERDATE"));
        var group = dim.group();
        var dealsizeChart = dc.rowChart

	d3.csv("/data/sales.csv", function(err, data) {
			if (err) throw err;
			
				var ndx = crossfilter(data);
			var all = ndx.groupAll();
			
			 var dim = ndx.dimension(dc.pluck("DEAL-SIZE"));

    	dealsizeChart("#dealsize")
				.dimension(dim)
				.group(group)
				.elasticX(true);

	dc.renderAll();



		});
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
            .brushOn(true)
            .dimension(SALESDim)
            .group(SALESGroup);

        dc.renderAll();
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
        .group(group);


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
