(function() {
    var app = angular.module('sample', []);
    angular.module('sample').
    service('chartsService', ['$http', '$rootScope', '$window',
        function($http, $rootScope, $window) {

            var COLORS = [
                'rgba(0, 234, 221, 0.5)',
                'rgba(232, 140, 209, 0.5)',
                'rgba(174, 140, 232, 0.5)',
                'rgba(0, 169, 19, 0.5)',
                'rgba(137, 204, 0, 0.5)',
                'rgba(204, 176, 0, 0.5)',
                'rgba(206, 105, 23, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(136, 255, 0, 0.5)',
                'rgba(142, 48, 160, 0.5)',
                'rgba(0, 222, 220, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(0, 234, 221, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(139, 126, 255, 0.5)',
                'rgba(142, 48, 160, 0.5)',
                'rgba(191, 6, 6, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(65, 196, 255, 0.5)',
                'rgba(137, 204, 0, 0.5)',
                'rgba(0, 169, 19, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(142, 48, 160, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(0, 222, 220, 0.5)',
                'rgba(137, 204, 0, 0.5)',
                'rgba(174, 140, 232, 0.5)',
                'rgba(0, 169, 19, 0.5)',
                'rgba(137, 204, 0, 0.5)',
            ];

            var vm = this;


            vm.charts = [];


            vm.drawChart = function(divId, chartData, chartOptions) {

                var DEFAULT_CANVAS_HEIGHT = 300;
                var DEFAULT_CANVAS_WIDTH = 400;
                var DEFAULT_CHART_TYPE = 'bar';

                var canvasHeight = (chartOptions.chart && chartOptions.chart.height) || DEFAULT_CANVAS_HEIGHT;
                var canvasWidth = (chartOptions.chart && chartOptions.chart.width) || DEFAULT_CANVAS_WIDTH;
                var chartType = (chartOptions.chart && chartOptions.chart.type) || DEFAULT_CHART_TYPE;

                var ctx = document.getElementById(divId).getContext("2d");
                ctx.canvas.height = canvasHeight;
                ctx.canvas.width = canvasWidth;



                /*Chart.defaults.global.tooltips.backgroundColor = "#EBEBEB";
                Chart.defaults.global.tooltips.titleFontColor = "#000";
                Chart.defaults.global.tooltips.bodyFontColor = "#000";*/


                var chart = new Chart(ctx, {
                    type: chartType,
                    data: chartData,
                    options: chartOptions
                });


                /*
	    	setTimeout(function() {
	    		var data = $window.myBar.chart.config.data.datasets[0].data;
		    	
		    	ctx.font = '22px "Helvetica Neue", Helvetica, Arial, sans-serif';
		    	ctx.fillStyle = "#000";        
		    	ctx.textAlign = "center"; 
		    	for (var i in data) {
		    		ctx.fillText(data[i], 200, 180);
		    	}
	    	}, 1000);
	    	
	    	
	    	*/

                vm.charts.push(chart);
                return chart;


            }

            vm.generateChartData = function(rawData, xAxisProp, yAxisProp, dateType, chartOptions) {
                var DEFAULT_IS_DATETYPE = false;
                var DEFAULT_DATASET_LABEL = 'x-axis';

                var isDatetype = dateType || DEFAULT_IS_DATETYPE;
                var datasetLabel = chartOptions.datasetLabel || DEFAULT_DATASET_LABEL;
                /*[{
	        	  date: new Date().getTime(),
	        	  utilization: 23.44,
	        	  location: 'ALL'
	          },{
	        	  date: new Date().getTime(),
	        	  utilization: 23.44,
	        	  location: 'ALL'
	          },{
	        	  date: new Date().getTime(),
	        	  utilization: 23.44,
	        	  location: 'ALL'
	          }];
	          */

                /*{
	              labels: ["January", "February", "March", "April", "May", "June", "July"],
	              datasets: [{
	                  label: 'Dataset 1',
	                  backgroundColor: "rgba(220,220,220,0.5)",
	                  data: [34, 34, 66, 2, 6, 23, 7]
	              }, {
	                  label: 'Dataset 2',
	                  backgroundColor: "rgba(151,187,205,0.5)",
	                  data: [7, 29, 99, 67, 83, 66, 94]
	              }, {
	                  label: 'Dataset 3',
	                  backgroundColor: "rgba(151,187,205,0.5)",
	                  data: [23, 44, 55, 68, 34, 5, 2]
	              }]

	          };*/

                var datasets = [];


                var labels = [];
                if (rawData.constructor !== Array) {
                    var datasetNames = Object.keys(rawData);

                    for (var i in datasetNames) {
                        var rawDataset = rawData[datasetNames[i]].data;
                        var backgroundColor = rawData[datasetNames[i]].backgroundColor;
                        var fill = rawData[datasetNames[i]].fill;
                        var lineColor = rawData[datasetNames[i]].lineColor;
                        var datasetLabel = rawData[datasetNames[i]].label;

                        var data = [];

                        for (var j in rawDataset) {
                            var label = rawDataset[j][xAxisProp];
                            label = isDatetype == true ? dateToMonth(new Date(label)) : label;
                            var utilization = rawDataset[j][yAxisProp];
                            labels.push(label);
                            data.push(utilization);
                        }

                        var dataset = {
                            label: datasetLabel,
                            data: data,
                            backgroundColor: backgroundColor,
                            fill: fill,
                            borderColor: lineColor
                        }
                        datasets.push(dataset);
                    }
                } else {
                    var data = [];
                    var backgroundColors = [];
                    for (var i in rawData) {
                        var label = rawData[i][xAxisProp];
                        label = isDatetype == true ? dateToMonth(new Date(label)) : label;
                        var utilization = rawData[i][yAxisProp];
                        if (rawData[i].backgroundColor) {
                            backgroundColors.push(rawData[i].backgroundColor);
                        }
                        if (label !== null) {
                            labels.push(label);
                        }
                        data.push(utilization);
                    }

                    var dataset = {
                        label: datasetLabel,
                        data: data,
                        //backgroundColor: 'rgba(132, 231, 221, 0.8)'
                        backgroundColor: backgroundColors.length > 0 ? backgroundColors : COLORS,
                    }
                    datasets.push(dataset);
                }

                /*var data = [];
	    	for (var i in rawData) {
	    		var label = rawData[i][xAxisProp];
	    		label = isDatetype == true ? dateToMonth(new Date(label)) : label;
	    		var utilization = rawData[i][yAxisProp];
	    		labels.push(label);
	    		data.push(utilization);
	    	}
	    	
	    	var dataset = {
				label: 'Utilization',
				data: data,
   			    backgroundColor: "rgba(8, 206, 185, 0.5)"
			}
			datasets.push(dataset);*/

                var truncatedLabels = labels;
                /*if (labels.length > 15) {
	    		truncatedLabels = [];
	    		for (var i in labels) {
	    			var finalStr = truncateString(labels[i], 6);
	    			if (labels[i].length > 6) 
	    				finalStr = finalStr + '..';
	    			
		    		truncatedLabels.push(finalStr);
		    	}
	    	}
	    	*/

                var chartData = {
                    labels: $.unique(truncatedLabels),
                    datasets: datasets
                }

                return chartData;
            }

            function capitalizeFirstLetter(label) {
                var finalLabel = label.substr(0, 1).toUpperCase() + label.substr(1);
                return finalLabel;
            }

            function truncateString(label, length) {
                return label.substr(0, length);
            }

            function customizeTooltip(chartData) {

            }


            function dateToMonth(date) {
                var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var month = MONTHS[date.getMonth()];
                var year = date.getFullYear();

                return month + ' ' + year;
            }


        }
    ]);
})();
