angular.module("sample")
.factory("BenchAPIService", ['$http', function($http) {

    var benchAPI = {};
    benchAPI.getBenchEmployees = function() {
        return $http.get('json/data.json');
    };
    return benchAPI;
}]);
