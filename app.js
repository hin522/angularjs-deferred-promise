var myApp = angular.module('myApp', []);

myApp.service('myService', ['$q', '$http', function($q, $http) {
    this.task1 = function() {
        var deferred = $q.defer();
        var promise= deferred.promise;
        deferred.resolve("task1 done");
        return promise;
    };
    this.task2 = function() {
        console.log('do task 2');
    };
    this.task3 = function() {
        console.log('do task 3');
    };
}]);

myApp.controller('myController', ['$q', '$scope', 'myService', function($q, $scope, myService) {
    $scope.doTasks = function() {
        myService.task1()
        .then(myService.task2)
        .then(myService.task3);
    };
}]);
