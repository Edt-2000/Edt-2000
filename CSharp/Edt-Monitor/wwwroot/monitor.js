$(document).ready(function () {
	Monitor.fillList();
});

var Monitor = {
	liveData: [],
	liveDataTask: null,
	liveDataTime: 0,
	liveDataChart: null,

	fillList: function () {
		$.get("/api/Messages/summary", function (data) {
			var list = $("#source-list");

			$("#source-list .run").remove();

			for (var i in data) {
				list
					.append($("<li>")
					.attr("data-id", data[i].id)
					.text("Run " + data[i].id + " (" + data[i].messageCount + " messages)")
					.addClass("run"));
			};

			$("#source-list li").click(function () {
				if (Monitor.liveDataTask != null) {
					window.clearInterval(Monitor.liveDataTask);
				}

				$("#source-list .selected").removeClass("selected");
				$(this).addClass("selected");

				Monitor.getData($(this).data("id"));
			});
		});
	},

	getData: function (id) {
		if (id == "live") {
			Monitor.liveData = [];
			Monitor.liveDataTime = (new Date()).getTime();

			Monitor.liveDataTask = window.setInterval(function () {

				$.get("/api/Messages/cache/" + Monitor.liveDataTime, function (data) {
					var hasData = false;

					// this code is very leaky leaky

					for (var i in data) {
						Monitor.liveData.push({
							'time': data[i].time,
							'value-1': data[i].arguments[0],
							'value-2': data[i].arguments[1],
							'value-3': data[i].arguments[2],
							'value-4': data[i].arguments[3],
							'value-5': data[i].arguments[4],
							'value-6': data[i].arguments[5]
						});
						hasData = true;
					}

					if (i > 0) {
						Monitor.liveDataTime = (new Date(data[i].time)).getTime();
					} else {
						Monitor.liveDataTime = (new Date()).getTime();
					}

					while (Monitor.liveData.length > 500) {
						Monitor.liveData.shift();
					}

					Monitor.setGraph(Monitor.liveData);

				});

			}, 100);

		} else {
			$.get("/api/Messages/" + id, function (data) {
				var graphData = [];

				for (var i in data) {
					graphData.push({
						'time': data[i].time,
						'value-1': data[i].arguments[0],
						'value-2': data[i].arguments[1],
						'value-3': data[i].arguments[2],
						'value-4': data[i].arguments[3],
						'value-5': data[i].arguments[4],
						'value-6': data[i].arguments[5]
					});
				}

				//Monitor.setGraph(graphData, graphData[100].time);
				Monitor.setGraph(graphData);
			});
		}
	},

	setGraph: function (data) {
		if (Monitor.liveDataChart != null) {
			Monitor.liveDataChart.dataProvider = data;
			Monitor.liveDataChart.validateData();
			Monitor.liveDataChart.write("graph");
		} else {
			Monitor.liveDataChart = AmCharts.makeChart("graph",
					{
						"type": "serial",
						"categoryField": "time",
						"sequencedAnimation": false,
						"color": "#2D2",
						"autoMargins": true,
						"categoryAxis": {
							"labelsEnabled": false,
							"startOnAxis": true
						},
						"graphs": [
							{
								"valueField": "value-1"
							},
							{
								"valueField": "value-2"
							},
							{
								"valueField": "value-3"
							},
							{
								"valueField": "value-4"
							},
							{
								"valueField": "value-5"
							},
							{
								"valueField": "value-6"
							}
						],
						/*"guides": [
							{
								"category": playLocation,
								"lineAlpha": 1,
								"lineColor": "#FFF"
							}
						],*/
						"valueAxes": [
						{
							"id": "ValueAxis-1",
							"gridColor": "#2d2",
							"gridAlpha": .5,
							"minimum": -128,
							"maximum": 128
						}
						],
						"dataProvider": data
					}
				);
		}
	}
};