app.service('loginService', ['$q', function($q){

  var ref = new Firebase("https://appreciar.firebaseio.com");


  //Esto lo tengo que probar despues para pasar todo a angularFire, es mas simple.....
  //tengo que incluir la dependencia $firebaseAuth
  //this.$firebaseAuth(ref);


  this.login = function(usuario){

      var defered = $q.defer();
			ref.authWithPassword(usuario, function(error, authData) {
    				if (error) {
    					console.log("Login Failed!", error);
              defered.reject(error);
    				} else {
    					console.log("Authenticated successfully with payload:", authData);
              defered.resolve(authData);
              //this.logueado = authData;
              //ref.authWithOAuthRedirect("google", function(error) { cambiarVista('altaForm'); });
            }
		     });
         return defered.promise;
	};

  /*A partir de la misma idea que para loguearse, armo el método de registración...*/
  // this.registro = function(usuario){
  //     //var defered = $q.defer();
  //     ref.createUser(usuario, function(error, userData) {
  //     if (error) {
  //       console.log("Error creating user:", error);
  //       //defered.reject(error);
  //     } else {
  //       console.log("Successfully created user account with uid:", userData.uid);
  //       //defered.resolve(userData);
  //     }
  //   });
  // };


  // this.registro2 = function(usuario){
  //   ref.createUser(usuario, function(error, userData) {
  //     var defered = $q.defer();
  //     if (error) {
  //       switch (error.code) {
  //         case "EMAIL_TAKEN":
  //           console.log("The new user account cannot be created because the email is already in use.");
  //           defered.reject(error);
  //           break;
  //         case "INVALID_EMAIL":
  //           console.log("The specified email is not a valid email.");
  //           defered.reject(error);
  //           break;
  //         default:
  //           console.log("Error creating user:", error);
  //           defered.reject(error);
  //       }
  //     } else {
  //       console.log("Successfully created user account with uid:", userData.uid);
  //       defered.resolve(userData);
  //     }
  //   });
  // }


}]);
