var app = angular.module('sample', []);

angular.module('sample').controller('firstController', ['$scope', 'BenchAPIService', 
function($scope, BenchAPIService) {

    var self = this;

    debugger

    getBenchEmployees();

    function getBenchEmployees() {
        $scope.loading = true;
        BenchAPIService
            .getBenchEmployees()
            .then(getBenchEmployeesSuccessHandler);
    }

    function getBenchEmployeesSuccessHandler(response) {
        var result = response.data.response;
        $scope.benchPieChartData = generateBenchPieChart($scope.benchList);
    }

    function generateBenchPieChart(benchList) {
        var pieChartData = [];
        var pieChartData = [{ "label": "Java", "count": 0 }, { "label": ".Net", "count": 0 }, { "label": "QA", "count": 0 }, { "label": "Other", "count": 0 }];

        for (var i = 0; i < benchList.length; i++) {
            if (benchList[i].skillName == skillObj[0]) {
                pieChartData[0]["count"] = pieChartData[0]["count"] + 1;
            } else if (benchList[i].skillName == skillObj[1]) {
                pieChartData[1]["count"] = pieChartData[1]["count"] + 1;
            } else if (benchList[i].skillName == skillObj[2]) {
                pieChartData[2]["count"] = pieChartData[2]["count"] + 1;
            } else {
                pieChartData[3]["count"] = pieChartData[3]["count"] + 1;
            }

        }
        return pieChartData;
    }

    // (function initialize() {
    //     generateBenchPieChart();
    // })();

}]);
