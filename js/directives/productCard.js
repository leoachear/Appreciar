app.directive('productCard',['$filter',function($filter) {
	return {
    	restrict: 'E',
    	scope: {
    		posts: '=',
    		prod: '=',
    	},
    	templateUrl: 'js/directives/productCard.html',
    	link: function(scope, element, attrs){
    		scope.filterProd = $filter('filter')(scope.prod, {$id: scope.posts.codProd.toString()});
    	}
  	};
}]);