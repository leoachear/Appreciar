app.controller('MainController', ['$scope', '$location','postsService', 'productService', function($scope, $location, postsService, productService){

	//lo pongo aca para que tenga un valor de entrada, luego se le cambia
	//dependiendo de la opcion de menu seleccionada.
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


	console.log("la concha de tu madre");
	//for (  post in this.datosBase) {
    //post.producto = productService.getProduct(post.codProd);
		//console.log("la concha de tu madre");
	// }

	// for(i = 0; i < $scope.datosBase.length; i++){
		//$scope.datosBase[i].producto = productService.getProduct(post.codProd);
		//var algo = productService.getProduct(post.codProd);
	// 	console.log($scope.datosBase[i].codProd);
	// }

	//array de opciones del menu principal
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

//Todo esto era un intento por hacer todos los filtros en un mismo controlador
//reutilizando la misma vista, pero no puedo hacer que se actualice... y la magia del
//$apply no funciona la segunda vez... solo para la primera vez
//asi que por ahora desisto y armo un controlador distinto que en realidad hace lo mismo
//y duplico la vista, todo duplicado, indignado estoy...
/*
function porZona(){
	//Lo unico que cambio es que traiga 8 en vez de 4
	console.log("entra al metodo");
	$scope.datosBase = [];
	myDataRef.limitToLast(8).on("child_added", function(snapshot) {
		//con el apply se "audita" lo que se esta cambiando para que angular lo actualice en la vista.
		$scope.$apply(function(){
			$scope.datosBase.push(snapshot.val());
		});
	});
}


//funcion para recibir la opcion seleccionada en el menu principal
$scope.announceClick = function(valor){
	//alert("Elgió la opción: " + $scope.menuOptions[valor]);
	console.log("elige: " + $scope.menuOptions[valor]);
	if(valor == 1){
			$scope.tipoListado = $scope.menuOptions[valor];
			console.log("llega hasta antes de ejecutar el metodo porZona");
			porZona();
	}
};//cierra funcion announceClick().

*/



//datos estaticos de prueba...
	$scope.prodPrueba = [
	{
		img: 'img/products/savora.jpg',
		titulo: 'Savora Clásica',
		desc: 'The titles'
	},
	{
		img: 'img/products/savora.jpg',
		titulo: 'Savora Clásica',
		desc: 'The titles'
	}
	]
	$scope.productos = [
	{
		img: 'img/products/savora.jpg',
		titulo: 'Savora Clásica',
		desc: 'The titles'
	},
	{
		img: 'img/products/aceitenatura.jpg',
		titulo: 'Aceitunas',
		desc: 'The titles'
	},
	{
		img: 'img/products/bucattiniluchetti.jpg',
		titulo: 'Fideos Bucattini',
		desc: 'The titles'
	},
	{
		img: 'img/products/cocacolalitroymedio.jpg',
		titulo: 'Coca Cola 1.5L',
		desc: 'The titles'
	},
	{
		img: 'img/products/laserenisima.jpg',
		titulo: 'Leche La Serenísima',
		desc: 'The titles'
	},
	{
		img: 'img/products/milaespinacagranja.jpg',
		titulo: 'Mila de Espinaca',
		desc: 'The titles'
	},
	{
		img: 'img/products/municioneslucheti.jpg',
		titulo: 'Fideos Municiones',
		desc: 'The titles'
	},
	{
		img: 'img/products/savora.jpg',
		titulo: 'Savora Clásica',
		desc: 'The titles'
	}
	];

}]);
