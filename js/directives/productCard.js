app.directive('productCard',['$filter','productService',function($filter,productService) {
	return {
    	restrict: 'E',
    	scope: {
    		posts: '=',
    		prod: '=',
    	},
    	templateUrl: 'js/directives/productCard.html',
    	link: function($scope, element, attrs){
    		$scope.filterProd = $filter('filter')($scope.prod, {$id: $scope.posts.codProd.toString()});

            $scope.positivo = function() {
                productService.positivo($scope.posts.$id);
            };
            $scope.negativo = function() {
                productService.negativo($scope.posts.$id);
            };
    	}
  	};
}]);