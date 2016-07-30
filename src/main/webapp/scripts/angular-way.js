angular.module("app", [
    'ngRoute'
])
    .controller("petsController", ["$scope", "pets", function ($scope, pets) {
        $scope.pets = pets.data;
    }])
    .controller("petController", ["$scope", 'pet', function ($scope, pet) {
        $scope.name = pet.data.name;
        $scope.gender = pet.data.gender;
        $scope.type = pet.data.type;
    }])
    .factory("petService", ["$http", function ($http) {
        return {
            pets: pets,
            getPetById: getPetById
        };
        function pets() {
            return $http.get('/api/pets');
        }

        function getPetById(id) {
            return $http.get('/api/pets/' + id);
        }
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/pets', {
                templateUrl: '../pets.html',
                controller: 'petsController',
                resolve:{
                    pets: function(petService){
                        return petService.pets();
                    }
                }
            })
            .when('/pets/:petId', {
                templateUrl: '../pet.html',
                controller: 'petController',
                resolve: {
                    pet: function (petService, $route) {
                        return petService.getPetById($route.current.params.petId);
                    }
                }
            })
            .otherwise({
                redirectTo: '/pets'
            });
    }]);