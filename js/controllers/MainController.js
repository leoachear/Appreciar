app.controller('MainController', ['$scope', '$location','productService','$rootScope', function($scope, $location, productService, $rootScope){

	//ESTO LO TENGO QUE CAMBIAR, porque cada vez que pasa por acá me blanquea el usuario, BOLUUUDOOOO KOKIIIIII
	//$rootScope.LOGUEADO = "";
	// $scope.usuario = "HOLA";
	// $scope.contrasenia = "";
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
		if(typeof $rootScope.LOGUEADO == 'undefined' && view == 'altaForm'){
			$location.path("login");
			console.log("LOGUEADO es undefined....");
		}
		else {
			$location.path(view);
			console.log("HOLAAAA - no es undefined!! o no está queriendo postear...");
			console.log($scope.LOGUEADO.auth);
			console.log(new Date ($scope.LOGUEADO.expires * 1000));
		}

	};

	// $scope.loguearse = function(){
	// 			var ref = new Firebase("https://appreciar.firebaseio.com");
	// 		ref.authWithPassword({
	// 			//esto por parametro...
	// 			email    : $scope.usuario,
	// 			password : $scope.contrasenia
	// 			//esto lo tendria que devolver....
	// 		}, function(error, authData) {
	// 			if (error) {
	// 				console.log("Login Failed!", error);
	// 			} else {
	// 				console.log("Authenticated successfully with payload:", authData);
	// 			}
	// 	});
	// };

}]);
