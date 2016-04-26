app.controller('MainController', ['$scope', '$location','productService', function($scope, $location, productService){

	//lo pongo aca para que tenga un valor de entrada, luego se le cambia
	//dependiendo de la opcion de menu seleccionada.
	$scope.tipoListado = "Listado Home";

	$scope.datosBase = productService.getAll('Posts');
	
	$scope.producto = productService.getProducts();
	
	$scope.datosProd = function(codProd) {
		$scope.producto = productService.getProducts(codProd);
	};

	$scope.menuOptions = [
		{
				nombre: "Ultimas Actualizaciones",
				opcion: "homeUltimas"
		},
		{
				nombre: "Por Zona",
				opcion: "homePorZona"
		},
		{
				nombre: "Por Productos",
				opcion: "homePorProductos"
		}
	];

	$scope.cambiarVista = function(view){
		$location.path(view);
	};

}]);
