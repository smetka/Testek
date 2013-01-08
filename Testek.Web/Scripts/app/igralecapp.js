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
        return $resource('api/igralec/:id', {id:'@id'});
    });

var players = [
    {id: 1, name: "Joško Joras"},
    {id:2, name: "Perpetua Mobilia"}
];

function MainCtrl($scope, Igralec) {
    $scope.players = Igralec.query();
    //$scope.players = players;
}

function CreateCtrl($scope, Igralec) {
    Igralec.save($scope.player, {headers:{'Content-Type':'application/json'}});
}

function EditCtrl($scope, $routeParams, Igralec) {
    //$scope.player = findById(players, $routeParams.id);
    $scope.player = Igralec.get({id:$routeParams.id});

    $scope.save = function(){
        Igralec.save($scope.player);
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