angular.module("sample")
    .factory("createChartService", ['$http', function($http) {

        var chartData = {};
        chartData.getChartData = function() {
            return $http.get('json/data.json');
        };
        return chartData;
    }]);
