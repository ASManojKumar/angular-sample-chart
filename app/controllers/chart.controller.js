var app = angular.module('sample', []);

angular.module('sample').controller('firstController', ['$scope', 'createChartService',
    function($scope, createChartService) {

        var self = this;

        var stateObj = { 0: "Kannada", 1: "Tamil", 2: "Telugu", 3: "Others" };

        function generateUtilizationChartData(utilizations) {

            var utilizationChartData = {};
            var utilizationUS = [];
            var utilizationIndia = [];
            var utilizationOverall = [];

            for (var i in utilizations) {
                var date = utilizations[i].utilizationDate;
                var utilization = utilizations[i];
                var utIN = 0;
                var utUS = 0;
                var utALL = 0;
                if (utilization.utilizationLocation.toLowerCase() == 'india') {
                    utIN = utilization.utilizationValue;
                    utilizationIndia.push({
                        date: date,
                        utilization: utIN
                    });

                } else if (utilization.utilizationLocation.toLowerCase() == 'us') {
                    utUS = utilization.utilizationValue;
                    utilizationUS.push({
                        date: date,
                        utilization: utUS
                    });

                } else if (utilization.utilizationLocation.toLowerCase() == 'overall') {
                    utALL = utilization.utilizationValue;
                    utilizationOverall.push({
                        date: date,
                        utilization: utALL
                    });
                }

            }

            utilizationChartData.India = {
                label: 'India',
                data: utilizationIndia,
                lineColor: 'rgb(253, 154, 55)',
                fill: false
            };

            utilizationChartData.US = {
                label: 'US',
                data: utilizationUS,
                lineColor: 'rgb(90, 172, 239)',
                fill: false
            };

            utilizationChartData.Overall = {
                label: 'Overall',
                data: utilizationOverall,
                lineColor: 'gray',
                fill: false
            };

            return utilizationChartData;
        }

        function utilizationListSuccessHandler(response) {
            var result = response.data.response;
            if (result.successObject) {
                $scope.utilizationChartData = generateUtilizationChartData(result.successObject);
            }
        }

        function getAllUtilzation() {
            $scope.loading = true;
            createChartService
                .getChartData()
                .then(utilizationListSuccessHandler, failureHandler)
                .finally(finallyHandler);
        }

        getAllUtilzation();

        getPieChart();

        function getPieChart() {
            $scope.loading = true;
            createChartService
                .getPieChartData()
                .then(getBenchEmployeesSuccessHandler, failureHandler)
                .finally(finallyHandler);
        }

        function getBenchEmployeesSuccessHandler(response) {
            var result = response.data.response;
            if (result.successObject) {
                var peopleList = [];
                for (var i in result.successObject) {
                    peopleList.push(result.successObject[i]);
                }
                $scope.peopleList = peopleList;
                $scope.benchPieChartData = generateBenchPieChart($scope.peopleList);

                var indiaCount = 0;
                var usCount = 0;
                for (var i in peopleList) {
                    if (peopleList[i].location == 'Bangalore' || peopleList[i].location == 'Noida') {
                        indiaCount++;
                    } else if (peopleList[i].location == 'US' || peopleList[i].location == 'Santa Clara') {
                        usCount++;
                    }
                }

                var peopleCountData = [{
                    location: 'India',
                    count: indiaCount
                }, {
                    location: 'US',
                    count: usCount
                }]
            }
        }

        function generateBenchPieChart(peopleList) {
            debugger
            var pieChartData = [];
            var pieChartData = [{ "label": "Kannada", "count": 0 }, { "label": "Tamil", "count": 0 }, { "label": "Telugu", "count": 0 }, { "label": "Others", "count": 0 }];

            for (var i = 0; i < peopleList.length; i++) {
                if (peopleList[i].stateName == stateObj[0]) {
                    pieChartData[0]["count"] = pieChartData[0]["count"] + 1;
                } else if (peopleList[i].stateName == stateObj[1]) {
                    pieChartData[1]["count"] = pieChartData[1]["count"] + 1;
                } else if (peopleList[i].stateName == stateObj[2]) {
                    pieChartData[2]["count"] = pieChartData[2]["count"] + 1;
                } else {
                    pieChartData[3]["count"] = pieChartData[3]["count"] + 1;
                }

            }
            return pieChartData;
        }

        function failureHandler(error) {
            console.error('ERROR: Failed in XHR : ' + error);
        }

        function finallyHandler() {
            $scope.loading = false;
        }

    }
]);
