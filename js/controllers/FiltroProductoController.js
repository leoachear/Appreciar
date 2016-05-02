app.controller('FiltroProductoController', ['$scope','productService', function ($scope, productService){

	$scope.loadProductos = function() {
      	$scope.productosDesplegable = productService.getProducts();
      	console.log($scope.productosDesplegable);
    };


}