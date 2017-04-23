var app = angular.module('sample', []);

angular.module('sample').controller('firstController', ['$scope', 'BenchAPIService', 
function($scope, BenchAPIService) {

    var self = this;

    getBenchEmployees();

    function getBenchEmployees() {
        $scope.loading = true;
        BenchAPIService
            .getBenchEmployees()
            .then(getBenchEmployeesSuccessHandler);
    }

    function getBenchEmployeesSuccessHandler(response) {
        var result = response.data;
        var dataForChart = result;
        _.each(dataForChart, function(newData) {
            self.valueSet = newData;
        });
    }

}]);
