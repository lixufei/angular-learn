angular.module('app', ['ngRoute']);

angular.module('app')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
              .when('/pets', {
                templateUrl: 'views/pet/pets.html',
                controller: 'petsController'
              })
              .when('/pets/:id', {
                templateUrl: 'views/pet/detail.html',
                controller: 'petController'
              })
              .otherwise({
                redirectTo: '/pets'
              });
        }]);

angular.module('app')
        .controller('petsController', ['$scope', 'petService', '$routeParams', function($scope, petService, $routeParams){
            $scope.input = '';
            petService.pets().then(function(response){
                $scope.pets = response.data;
            });
        }])
        .controller('petController', ['$scope', 'petService', '$routeParams', '$location', function($scope, petService, $routeParam, $location){
            petService.pet($routeParam.id).then(function(response){
                $scope.pet = response.data;
            });
            $scope.back = function(yourName){
                console.log('who are you?', yourName);
                $location.path('pets');
            };
        }])
        .directive('petDetail', ['$location', function($location){
            return {
                restrict: 'E',
                scope: {
                    pet: '=',
                    backFunc: '&'
                },
                template: '<section><h3>Pet {{pet.name}} detail:</h3><ul><li><label>name:</label><span>{{pet.name}}</span></li><li><label>gender:</label><span>{{pet.gender}}</span></li><li><label>type:</label><span>{{pet.type}}</span></li></ul><button ng-click="backFunc({message: \'koly\'})">back</button></section>',
//                templateUrl: '/views/partials/pet-detail.html',
                link: function(scope){

                    scope.$watch(function(){
                        console.log('digesting...');
                    });
                    console.log('scope.pet', scope.pet);
                    console.log('scope.backFunc', scope.backFunc);
                }
            };
        }])
        .factory('petService', ['$http', function($http){
            return {
                pets: pets,
                pet: pet
            };

            function pets(){
                var promise = $http.get('/api/pets');
                console.log('promise', promise);
                return promise;
            }

            function pet(id) {
                return $http.get('/api/pets/' + id);
            }
        }]);
