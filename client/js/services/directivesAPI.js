angular
  .module('DirectivesAPI', [])
  .factory('directivesAPI', ['$http',
    function($http){
      return {
        getAll: function(){
          return $http.get('/api/directives');
        },
        save: function(newDirective){
          return $http.post('/api/directives', newDirective);
        },
        remove: function(id){
          return $http.delete('/api/directives/' + id);
        }
      }
    }])
