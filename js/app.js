var app = angular.module('Appreciar', ['ngMaterial','ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			controller: 'MainController',
			templateUrl: 'views/home.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});