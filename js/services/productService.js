app.service('productService', ['$firebaseArray','$firebaseObject','$q', function($firebaseArray,$firebaseObject,$q){
//app.service('productService', ['$q', function($q){

  this.myDataRef = new Firebase('https://appreciar.firebaseio.com/');  

  this.getAll = function(accion) {
    this.accionRef = this.myDataRef.child(accion);
    var query = this.accionRef.orderByKey().limitToLast(8);
    this.datos = [];

    this.datos = $firebaseArray(query);

    return this.datos;
  };

  this.getProducts = function(idProd){
   if (idProd == null || idProd == '' || idProd == undefined)
    {
      this.prodRef = this.myDataRef.child('Productos');
    }else{
      this.prodRef = this.myDataRef.child('Productos').child(idProd.toString());
    }

    this.productos = $firebaseArray(this.prodRef);
    
    return this.productos;
  };

  this.agregarPost = function(post) {
    var defered = $q.defer();

    this.datos.$add(post).then(function(ref){
      defered.resolve();
    });

    var postsProdRef = this.prodRef.child(post.codProd).child('posts');
    var postsProd = $firebaseArray(postsProdRef);
    postsProd.$add(post);

    return defered.promise;
  };

  this.positivo = function(postId) {
    var postIdRef = this.myDataRef.child('Posts').child(postId);
    var positivoRef = postIdRef.child('positivos');

    positivoRef.once("value", function(data) {
      var suma = data.val();
      suma += 1;
      postIdRef.update({positivos:suma});
    });
  };


  this.negativo = function(postId) {
    var postIdRef = this.myDataRef.child('Posts').child(postId);
    var negativoRef = postIdRef.child('negativos');

    negativoRef.once("value", function(data) {
      var suma = data.val();
      suma += 1;
      postIdRef.update({negativos:suma});
    });
  };
}]);
