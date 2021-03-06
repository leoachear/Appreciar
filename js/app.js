var app = angular.module('Appreciar', ['ngMaterial','ngRoute','firebase','ngMessages','ngMaterial']);

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
		.when('/homePorZona',{
			controller: 'FiltroZonaController',
			templateUrl: 'views/homePorZona.html'
		})
		.when('/homePorProductos',{
			controller: 'FiltroProductoController',
			templateUrl: 'views/homePorProductos.html'
		})
		// .when('/homeUltimas',{
		// 	controller: 'FiltroHomeController',
		// 	templateUrl: 'views/home2.html'
		// })
		.when('/mapaForm',{
			controller: 'MapsController',
			templateUrl: 'views/mapaForm.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
