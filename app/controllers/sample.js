var app = angular.module('sample', []);
app.controller('filterController', [function() {

        var self = this;

        self.tableData = [{
            "name": "manoj",
            "time": "morning",
            "source": "blr",
            "dest": "mas"
        }, {
            "name": "manoj",
            "time": "morning",
            "source": "blr",
            "dest": "mas"
        }, {
            "name": "asdf",
            "time": "evening",
            "source": "ran",
            "dest": "blr"
        }, {
            "name": "ram",
            "time": "noon",
            "source": "cbe",
            "dest": "mum"
        }];

        self.results = [];

        self.filterDetails = function(enteredValue) {
            angular.forEach(self.tableData, function(value) {
                if ((value.name === enteredValue) || (value.time === enteredValue) || (value.source === enteredValue) || (value.dest === enteredValue)) {
                    self.results.shift();
                    self.results.push({
                        name: value.name,
                        time: value.time,
                        source: value.source,
                        dest: value.dest
                    });
                };
            });
        };

    }

]);
