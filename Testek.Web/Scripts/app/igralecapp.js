//'use strict';
var ngIgralecApp = angular.module('igralecapp', [])
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

var players = [
    {id: 1, name: "Joško Joras"},
    {id:2, name: "Perpetua Mobilia"}
];

function MainCtrl($scope) {
    $scope.players = players;
}

function CreateCtrl($scope) {
    $scope.players = [
        {id: 1, name: "Joško Joras"},
        {id:2, name: "Perpetua Mobilia"}
    ];
}

function EditCtrl($scope, $location, $routeParams) {
    $scope.player = findById(players, $routeParams.id);
}

function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id == id) {
            return source[i];
        }
    }
    throw "Couldn't find object with id: " + id;
}