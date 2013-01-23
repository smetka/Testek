//'use strict';
var ngIgralecApp = angular.module('igralecapp', ['igralecServices'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
              templateUrl: 'scripts/app/home/main.html',
              controller: 'MainCtrl'
            })
            .when('/new', {
              templateUrl: 'scripts/app/home/detail.html',
              controller: 'CreateCtrl'
            })
            .when('/edit/:id', {
                templateUrl: 'scripts/app/home/detail.html',
                controller: 'EditCtrl'
            })
            .otherwise({
              redirectTo: '/'
            });
    }]);

angular.module('igralecServices', ['ngResource'])
    .factory('Igralec', function($resource){
        return $resource('api/igralec/:id',
            {id:'@id'},
            {update: {method:'PUT'}});
    });

function MainCtrl($scope, $location, Igralec) {
    $scope.players = Igralec.query();
    //$scope.players = players;
    $scope.delete = function(idx){
        var toDelete = $scope.players[idx];
        Igralec.delete({id:toDelete.Id}, function(){
            $scope.players.splice(idx, 1);
        });
    }
}

function CreateCtrl($scope, $location, Igralec) {
    $scope.save = function(){
        var i = new Igralec($scope.player);
        i.$save();
        $location.path('/');
    };
}

function EditCtrl($scope, $routeParams, $location, Igralec) {
    //$scope.player = findById(players, $routeParams.id);
    $scope.player = Igralec.get({id:$routeParams.id});

    $scope.save = function(){
        Igralec.update({id:$routeParams.id}, $scope.player);
        $location.path('/');
    }

}

function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id == id) {
            return source[i];
        }
    }
    throw "Couldn't find object with id: " + id;
}