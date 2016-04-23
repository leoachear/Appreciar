app.directive('postCard',function() {
	return {
    	restrict: 'E',
    	scope: {
    		post: '='
    	},
    	templateUrl: 'js/directives/postCard.html'
  	};
});
