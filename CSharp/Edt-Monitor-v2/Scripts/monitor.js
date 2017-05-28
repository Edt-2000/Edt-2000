var Monitor = {
	dataBuffer: [],
	graphs: [],

	addGraph: function (id) {
		$('#graphs').append($('<div>').addClass("graph").append($('<canvas>').attr("width","800px").attr("height","350px").attr("id", id)));

		Monitor.graphs[id] = new SmoothieChart({
			millisPerPixel : 12,
			grid: {
				strokeStyle: 'rgb(192, 0, 192)',
				fillStyle: 'rgb(0, 0, 0)',
				lineWidth: 1,
				millisPerLine: 512,
				verticalSections: 6
			}
		});
		Monitor.graphs[id].streamTo(document.getElementById(id), 0);

		Monitor.dataBuffer[id] = new TimeSeries();

		Monitor.graphs[id].addTimeSeries(
			Monitor.dataBuffer[id],
			{
				strokeStyle: 'rgb(0, 255, 0)',
				lineWidth: 3
			});
	},

	addData: function (id, data) {
		if (Monitor.graphs[id] == null) {
			Monitor.addGraph(id);
		}

		Monitor.dataBuffer[id].append(new Date().getTime(), data);
	}
};

$(function () {
	var messageHub = $.connection.messageHub;

	messageHub.client.Message = function (path, value) {
		Monitor.addData(path, value);
	};

	$.connection.hub.start();
});