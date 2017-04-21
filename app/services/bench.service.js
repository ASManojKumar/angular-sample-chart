var app = angular.module('sample');
angular.module("sample").factory("BenchAPIService", ['$http', 'ENV', function($http, ENV) {

    var benchAPI = {};
    benchAPI.getBenchEmployees = function() {
        $http.get('json/data.json').success(function(data) {
            $scope.phones = data;
        });
    };
    return benchAPI;
}]);
