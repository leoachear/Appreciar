app.controller('LoginController', ['$scope', '$location', '$rootScope','loginService','$mdDialog',
  function($scope, $location, $rootScope, loginService, $mdDialog){

  $scope.usuario = {email: "", password: ""};
  $scope.email2 = "";
  $scope.errorGeneral = "";
  $scope.mostrarOcultar = true;

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
  $scope.registrarse = function(){
    //oculto el error general.
    $scope.errorGeneral = "";
    $scope.mostrarOcultar = true;

    if($scope.usuario.email == $scope.email2){
      loginService.registro($scope.usuario).then(function(userData){
        // alert("registrado...!");
        console.log(userData + " registrado...");
        $scope.mostrarOcultar = true;
        //$scope.cambiarVista('login');ç
        $scope.loguearse();
      },function(error){
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("El mail ya se encuentra registrado...");
            $scope.errorGeneral = "El mail ya se encuentra registrado...";
            $scope.mostrarOcultar = false;
            $scope.showAlert();
            break;
          case "INVALID_EMAIL":
            console.log("El mail ingresado no es válido");
            $scope.errorGeneral = "El mail ingresado no es válido";
            $scope.mostrarOcultar = false;
            break;
          default:
            console.log("Error creating user:", error);
            $scope.errorGeneral = "ups, hubo un error al crear tu usuario.";
            $scope.mostrarOcultar = false;
        }
      });
    }
    else{
        $scope.errorGeneral = "Los mails deben ser iguales.";
        $scope.mostrarOcultar = false;
        console.log("Los mails deben ser iguales...");
    }

  };

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

  $scope.loginRedSocial = function(red){
    loginService.loginRed(red).then(function(authData){
      $rootScope.LOGUEADO = authData;
      // if(red === "twitter"){
      //   sessionStorage.setItem('foto', "url('" + authData.twitter.profileImageURL + "');");
      //   sessionStorage.setItem('nombre', authData.twitter.username);
      //   console.log("logueado con twitter!");
      // }else{
      //   sessionStorage.setItem('foto', "url('" + authData.twitter.profileImageURL + "');");
      //   sessionStorage.setItem('nombre', authData.twitter.displayName);
      //   console.log("logueado con facebook");
      // }
      $scope.cambiarVista('home');
    },function(error){
      console.log("error al loguear con red social... - " + error);
    });
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
