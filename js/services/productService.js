app.service('productService', ['$q', function($q){
  
  // var service = {
  //   function(){
  //
  //           var deferred = $q.defer();
  //
  //           var myDataRef = new Firebase('https://brilliant-heat-4810.firebaseio.com/productos');
  //           var data = [];
  //           myDataRef.limitToLast(4).on("child_added", function(snapshot) {
  //               data.push(snapshot.val());
  //           });
  //           return deferred.promise;
  //
  //       }
  // };

  //return service;

  this.getProducts = function(){
    var myDataRef = new Firebase('https://brilliant-heat-4810.firebaseio.com/productos');
    var data = [];
    myDataRef.limitToLast(4).on("child_added", function(snapshot) {
        data.push(snapshot.val());
    });
    return data;
  }


}]);
