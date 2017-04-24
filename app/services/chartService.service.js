angular.module("sample")
    .factory("createChartService", ['$http', function($http) {

        var chartData = {};
        chartData.getChartData = function() {
            return $http.get('json/data.json');
        };
        chartData.getChartDataOption2 = function() {
            return $http.get('json/dataOption2.json')
        }
        chartData.getPieChartData = function() {
            return $http.get('json/dataForPie.json');
        };
        chartData.getPieChartDataOption2 = function() {
            return $http.get('json/dataForPieOption2.json');
        };
        return chartData;
    }]);
