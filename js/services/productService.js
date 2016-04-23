app.service('productService', ['$q', function($q){

  this.getProduct = function(codigoProducto){
    var myDataRef = new Firebase('https://appreciar.firebaseio.com/Productos');
    var produ;
    myDataRef.child(codigoProducto).once('value', function(){
      produ = snapshot.val();
    });
    //myDataRef.on("child_added", function(snapshot) {
      //  data = snapshot.val();
    //});
    return produ;
  }


}]);
