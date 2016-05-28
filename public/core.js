// Sets the to-do Modle up and provides an empty array to put the to-dos in
var todo = angular.module('todoApp', []);

// Sets the main controller up to handle the form data

todo.controller('mainController', ['$scope', '$http', function mainController($scope, $http) {
    $scope.formData = {};

    $scope.reverse = false;
// Says when you get to the main page, grab all to-dos and popluate them (or kick an error)
    $http.get('/api/todos').then(function(data) {
        $scope.todos = todo.data;
        console.log(data);
    });

    $scope.updateOrderBy = function(){
        $scope.orderByField = "title";
        $scope.reverse = !$scope.reverse;
    }
// Says that when the form is submitted, send the form contents to the API for storage, clear the form out, OR kick an error
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

// Says that if a to-do is checked off, it will be deleted (or ... you guessed it ... kicks an error)
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]); // end of mainController function
