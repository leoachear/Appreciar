app.service('productService', ['$firebaseArray','$firebaseObject', function($firebaseArray,$firebaseObject){
//app.service('productService', ['$q', function($q){

  this.myDataRef = new Firebase('https://appreciar.firebaseio.com/');
  

  this.getAll = function(accion) {
    this.accionRef = this.myDataRef.child(accion);
    var query = this.accionRef.orderByKey().limitToLast(10);
    var datos = [];

    datos = $firebaseArray(query);

    return datos;
  };

  this.getProducts = function(idProd){

   if (idProd == null || idProd == '' || idProd == undefined)
    {
      this.prodRef = this.myDataRef.child('Productos');
    }else{
      this.prodRef = this.myDataRef.child('Productos').child(idProd.toString());
    }
    
    return $firebaseArray(this.prodRef);
  };


}]);
