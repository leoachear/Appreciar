app.controller('MainController', ['$scope', '$location','productService', function($scope, $location, productService){

	//lo pongo aca para que tenga un valor de entrada, luego se le cambia
	//dependiendo de la opcion de menu seleccionada.
<<<<<<< Updated upstream
	$scope.tipoListado = "Listado Home";

	$scope.datosBase = productService.getAll('Posts');
	
	$scope.producto = productService.getProducts();
	
	$scope.datosProd = function(codProd) {
		$scope.producto = productService.getProducts(codProd);
	};
=======
	$scope.tipoListado = "Listado Home de Posts";

	//var myDataRef = new Firebase('https://appreciar.firebaseio.com/Posts');
	//var myDataRef = new Firebase('https://brilliant-heat-4810.firebaseio.com/productos');
	//$scope.datosBase = [];
	//limitToLast(5).
//	myDataRef.limitToLast(4).on("child_added", function(snapshot) {
		//con el apply se "audida" lo que se esta cambiando para que angular lo actualice en la vista.
		//$scope.$apply(function(){
			//$scope.datosBase.push(snapshot.val());
		//});

	//});

	//Leo los datos para llenar la view HOME.
	$scope.datosBase = postsService.getPosts();

	var algo = productService.getProduct(1001);
	//console.log(algo.nombre);
	//for (  post in this.datosBase) {
    //post.producto = productService.getProduct(post.codProd);
		//console.log("la concha de tu madre");
	// }

	// for(i = 0; i < $scope.datosBase.length; i++){
		//$scope.datosBase[i].producto = productService.getProduct(post.codProd);
		//var algo = productService.getProduct(post.codProd);
	// 	console.log($scope.datosBase[i].codProd);
	// }
>>>>>>> Stashed changes

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
