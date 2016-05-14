app.controller('LoginController', ['$scope', '$location', '$rootScope','loginService',
  function($scope, $location, $rootScope, loginService){

  $scope.usuario = {email: "", password: ""};
  $scope.email2 = "";




  /* la autenticacion es asincronica entendi por ahi, y me di cuenta de que tarda.
  hay dos maneras para hacer muchas cosas en firebase, callbacks y promises.
  La onda es que para que funcione esto, hice un service que devuelve un promise, y aca esta
  tomando ese promise con el THEN y haciendo algo por el success, que seria lo logueado
  y por el error haria otra cosa....*/
  $scope.loguearse = function() {
    loginService.login($scope.usuario).then(function(authData){
      $rootScope.LOGUEADO = authData;
      $scope.cambiarVista('altaForm');

    }, function(error){
      console.log(error);
      $scope.message = error
    });

  };

  /*Acá trato de usar lo mismo que arriba, recibir LA PROMESA...... pero devuelve otro
  objeto, en vez de authData, userData; así que no sé... */
  // $scope.registrarse = function(){
  //   if($scope.usuario.email == $scope.email2){
  //     loginService.registro2($scope.usuario).then(function(userData){
  //       alert("registrado...!");
  //       console.log(userData);
  //     });
  //     .then(function(error){
  //       alert("algo falló");
  //       console.log(error);
  //     });
  //   }
  // };



  $scope.cambiarVista = function(view){
    /*la idea es que si hay algo en el objeto LOGUEADO te redirecciona a donde
    le pedis, sino te dirige al login.
    igual lo dejo que solo te redireccione al login si le pedis altaForm */
    if(view == "altaForm"){
      if($rootScope.LOGUEADO !== ""){
        $location.path(view);
        console.log("HOLAAAA");
      }else{
        console.log("no podes entrar......");
        $location.path("login");
      }
    }
    $location.path(view);
  };

  //todo esto para después, para hacerlo con angularFire
  // $scope.auten = loginService;
  //   $scope.auth.$onAuth(function(authData) {
  //   $scope.LOGUEADO = authData;
  // });
  //
  // $scope.loguearse = function(){
  //   $scope.auth.$authWithOAuthPopup('google');
  // }

}]);
