app.directive('productCard',function() {
	return {
    	restrict: 'E',
    	scope: {
    		producto: '='
    	},
    	templateUrl: 'js/directives/productCard.html'
  	};
});