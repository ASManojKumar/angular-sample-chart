var app = angular.module('sample', []);

angular.module('sample').controller('firstController', ['$scope', 'createChartService',
    function($scope, createChartService) {

        var self = this;

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

        function failureHandler(error) {
            console.error('ERROR: Failed in XHR : ' + error);
        }

        function finallyHandler() {
            $scope.loading = false;
        }

    }
]);
