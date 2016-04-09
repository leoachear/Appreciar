app.controller('MainController', ['$scope', function($scope){


	var myDataRef = new Firebase('https://appreciar.firebaseio.com/Posts');
	$scope.datosBase = [];

	myDataRef.on("child_added", function(snapshot) {

		$scope.datosBase.push(snapshot.val());
console.log("carga datos");
});



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
