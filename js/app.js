var app = angular.module('Appreciar', ['ngMaterial','ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			controller: 'MainController',
			templateUrl: 'views/home.html'
		})
		.when('/altaForm',{
			controller: 'FinderController',
			templateUrl: 'views/altaForm.html'
		})
		.when('/mapaForm',{
			controller: 'MapsController',
			templateUrl: 'views/mapaForm.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

