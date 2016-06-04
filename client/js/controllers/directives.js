angular
  .module('directivesController', ['DirectivesAPI'])
  .controller('DirectivesController', ['$scope', '$http', 'directivesAPI',
    function( $scope, $http, directivesAPI ) {

    $scope.title = "Project Directives";
    $scope.directives = [];

    $scope.saveDirective = function(directive){
      var newDirective = {
        directive: directive
      }

      directivesAPI.save(newDirective).then(function(response){
        console.log(response);
        console.log($scope.directives);
        $scope.directives.push(response.data);
      })
    }

    directivesAPI.getAll().then(function(response){
      console.log(response);
      $scope.directives = response.data.directives;
      $filter('orderBy')(directives.priority, reverse);
    })

    $scope.removeDirective = function(directive){
      directivesAPI.remove(directive._id).then(function(response){
        if(response.status == 204){
          $scope.directives = $scope.directives.filter(function(d){
            return d._id != directive._id;
          })
        }
      })
    }
  }
]);
