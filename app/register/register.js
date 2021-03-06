'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl',
            activetab: 'register'

        });
    }])

    .controller('RegisterCtrl', ['$scope', '$route', '$http', function ($scope, $route, $http) {
        $scope.step = 1;

        $scope.formData = {};

        $scope.formData.social_accounts = [];

        $scope.alreadyPressed = {
            'facebook': false,
            'twitter': false,
            'github': false,
            'instagram': false,
            'bitcoin': false,
            'nem': false
        };

        $scope.showNoXEMAlert = false;
        $scope.showAlreadyExistsAlert = false;
        $scope.changeFormView = function (id) {
            $scope.step = id;
            console.log($scope.step);
        };

        //Step 1
        $scope.checkIfAliasAlreadyExists = function () {
            $http.get('http://myalias.herokuapp.com/alias/' + $scope.formData.alias + '/check', null, null).then(function (success) {
                    if(success.data.available){
                        $scope.step = 2;
                        $scope.showAlreadyExistsAlert = false;
                    }
                    else{
                        $scope.showAlreadyExistsAlert = true;
                    }

                }, function (error) {
                    $scope.showAlreadyExistsAlert = true;

                });
        }
        //Step 2
        $scope.addRow = function (socialNetwork) {
            if (!$scope.alreadyPressed[socialNetwork]) {

                $scope.alreadyPressed[socialNetwork] = true;

                $scope.formData.social_accounts.push({
                    id: socialNetwork,
                    username: ''
                });
            }
        };

        $scope.register = function () {
            $http.post('http://myalias.herokuapp.com/alias', $scope.formData, null).then(function (success) {
                $scope.step = 3;
            }, function (error) {
                $scope.showNoXEMAlert = true;
            });
        };


    }]);