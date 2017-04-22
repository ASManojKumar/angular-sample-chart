(function() {
    'use strict';
    var app = angular.module('sample');
    angular.module('sample')
        .directive('firstOne', function() {
            return {
                restrict: 'EA',
                bindToController: true,
                controller: 'firstController',
                controllerAs: 'first',
                replace: true,
                templateUrl: 'index.html'
            };
        });

})();
