angular.module("sample")
    .factory("createChartService", ['$http', function($http) {

        var chartData = {};
        chartData.getChartData = function() {
            return $http.get('json/data.json');
        };
        chartData.getPieChartData = function() {
            return $http.get('json/dataForPie.json');
        };
        return chartData;
    }]);
