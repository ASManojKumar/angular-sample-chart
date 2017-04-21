var app = angular.module('sample', []);
angular.module('sample')
    .directive('chart', ['chartsService',
        function(chartsService) {
            return {
                restrict: 'E',
                template: '<canvas></canvas>',
                replace: true,
                link: chartLinker,
                controller: chartController,
                scope: {
                    id: '=',
                    chartData: '=?',
                    chartType: '=?',
                    hAxisProp: '=?',
                    yAxisProp: '=?',
                    dateType: '=?',
                    datasetLabel: '=?',
                    legendDisplay: '@',
                    yScaleSuffix: '@',
                    hScaleLabel: '@',
                    yScaleLabel: '@',
                    yScaleMin: '@',
                    yScaleMax: '@'
                }
            };


            function chartLinker(scope, element, attrs) {
                var self = this;

                self.max = 0;
                console.log(scope);
                if (scope.chartType != "pie") {
                    var chartOptions = {
                        id: scope.id,
                        datasetLabel: scope.datasetLabel,
                        datalabels: true,
                        maintainAspectRatio: false,
                        /*onClick: function(e, o, f) {
                    scope.$emit('datapointClick', o);
                  },*/
                        zoom: {
                            enabled: false,
                            mode: 'xy',
                        },
                        pan: {
                            enabled: false,
                            mode: 'xy'
                        },
                        chart: {
                            height: 300,
                            type: scope.chartType
                        },
                        /*elements: {
                            rectangle: {
                                borderWidth: 1,
                                borderColor: 'black',
                                borderSkipped: 'bottom'
                            }
                        },*/
                        responsive: true,
                        legend: {
                            display: scope.legendDisplay,
                            position: 'bottom',
                        },
                        title: {
                            display: false,
                            text: 'Chart.js Bar Chart'
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: scope.hScaleLabel,
                                    fontColor: '#000',
                                    fontSize: 16
                                }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: scope.yScaleMin ? false : true,
                                    min: scope.yScaleMin,
                                    max: scope.yScaleMax,
                                    callback: function(label, index, labels) {

                                        if (self.max < label)
                                            self.max = label;
                                        return label + scope.yScaleSuffix;
                                    }
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: scope.yScaleLabel,
                                    fontColor: '#000',
                                    fontSize: 16
                                }
                            }]
                        },
                        showTooltips: false,
                        tooltipTemplate: "<%= value %>",
                        //                    tooltips: {
                        //                        callbacks: {
                        //                            label: function(tooltipItem, data) {
                        //                                var label = data.datasets[tooltipItem.datasetIndex].label;
                        //                                return label + ': ' + tooltipItem.yLabel + '(Click here to get more datafff)';
                        //                            }
                        //                        }
                        //                    }
                        /*animation: {
                            duration: 0,
                            onComplete: function (opts) {
                              console.log(this.config.type);
                                var ctx = this.chart.ctx;
                                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';

                                this.data.datasets.forEach(function (dataset) {
                                    for (var i = 0; i < dataset.data.length; i++) {
                                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                                        ctx.fillText(dataset.data[i], model.x, model.y - 5);
                                    }
                                });
                            }
                        },*/
                        tooltips: {
                            callbacks: {
                                title: function(tooltipItem, data) {
                                    return tooltipItem[0].xLabel + ' : ' + tooltipItem[0].yLabel;
                                },
                                label: function(tooltipItem, data) {
                                    var label = data.datasets[tooltipItem.datasetIndex].label;
                                    //return label + ': ' + tooltipItem.yLabel + '(Click here to get more data)';
                                    return '';
                                }
                            }
                        }
                    };

                } else if (scope.chartType = "pie") {
                    var chartOptions = {
                        id: scope.id,
                        datasetLabel: scope.datasetLabel,
                        chartData: scope.chartData,
                        datalabels: true,
                        maintainAspectRatio: false,
                        zoom: {
                            enabled: false,
                            mode: 'xy',
                        },
                        pan: {
                            enabled: false,
                            mode: 'xy'
                        },
                        chart: {
                            height: 300,
                            type: scope.chartType
                        },
                        responsive: true,
                        legend: {
                            display: scope.legendDisplay,
                            position: 'bottom',
                        },
                        title: {
                            display: false,
                            text: 'Chart.js Pie Chart'
                        },
                        showTooltips: true,
                        tooltipTemplate: "<%= value %>",
                    };
                }

                if (element.context.id === 'profitability') {
                    chartOptions.tooltips = {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return 'Click for more details';
                            }
                        }
                    }
                }




                scope.$watchCollection('chartData', function(newVal, oldVal) {
                    if (newVal) {


                        var chartData = chartsService.generateChartData(scope.chartData, scope.hAxisProp, scope.yAxisProp, JSON.parse(scope.dateType), chartOptions);

                        var datasets = chartData.datasets;
                        var data = [];
                        for (var i in datasets) {
                            data = data.concat(datasets[i].data);
                        }

                        self.max = data[0];
                        for (var j in data) {
                            if (self.max < data[j])
                                self.max = data[j];
                        }

                        //chartOptions.scales.yAxes[0].ticks.max = ( self.max  );


                        var chart = chartsService.drawChart(attrs.id, chartData, chartOptions);

                        if (chart && chart.options.datasetLabel === 'Profitability GM YTD') {
                            var ctx = chart.chart.ctx;
                            ctx.canvas.onclick = function(evt) {
                                //var activePoints = chart.getDatasetAtEvent(evt);
                                var activePoints = chart.getElementsAtEvent(evt);
                                console.log(activePoints);
                                scope.$emit('datapointClick', activePoints);
                            };
                        }
                        if (chart && chart.options.datasetLabel === 'BenchSkillBarChart') {
                            var ctx = chart.chart.ctx;
                            ctx.canvas.onclick = function(evt) {
                                var activePoints = chart.getElementsAtEvent(evt);
                                scope.$emit('benchBarChartClick', activePoints);
                            };
                        }

                        if (chart && chart.options.datasetLabel === 'BenchSkillPieChart') {
                            var ctx = chart.chart.ctx;
                            ctx.canvas.onclick = function(evt) {
                                var activePoints = chart.getElementsAtEvent(evt);
                                scope.$emit('benchPieChartClick', activePoints);
                            };
                        }
                        if (chart && chart.options.datasetLabel === 'PracticeInputBarChart') {
                            var ctx = chart.chart.ctx;
                            ctx.canvas.onclick = function(evt) {
                                var activePoints = chart.getElementsAtEvent(evt);
                                scope.$emit('practiceBarChartClick', activePoints);
                            };
                        }
                        console.log(chart);
                    }
                });

            }

            function chartController() {

            }
        }
    ]);
