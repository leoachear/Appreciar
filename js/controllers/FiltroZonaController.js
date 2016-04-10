app.controller('FiltroZonaController', ['$scope', function($scope){


	//var myDataRef = new Firebase('https://appreciar.firebaseio.com/Posts');
	var myDataRef = new Firebase('https://brilliant-heat-4810.firebaseio.com/productos');
	$scope.datosZona = [];
	//No busca por zona, trae 8 registros cuando el otro solo trae 4... nada mas
	//luego hay que hacer la logica que queramos...
	myDataRef.limitToLast(8).on("child_added", function(snapshot) {
		 //$scope.$apply(function(){
			$scope.datosZona.push(snapshot.val());
		 //});
		 //console.log("ejecuto el controlador...");
	});


}]);
