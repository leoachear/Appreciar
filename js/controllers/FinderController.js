app.controller('FinderController', ['$scope','$mdToast','productService', function ($scope,$mdToast, productService, $log){
    //'use strict';//tenia esto no se bien para que, investigue que es pero no lo entendi del todo menos
    //teniendo en cuenta que funciona igual si lo saco...

    //aca como que hace una variable de si mismo...
    //supongo que usando directamente el scope que recibo arriba (obvio para todo)
    //deberia funcionar, pero no probé...
    //var $scope = this;

    function iconConfiguration($mdIconProvider) {
        $mdIconProvider.defaultIconSet('icons_24x24.svg', 24);
    };

    app.config(iconConfiguration);

    var mapa;
    var geocoder;

    $scope.view = {
        addressInput: '',
        places: [],
        selectedPlace: '',
        markers: [],
    };

    $scope.buscarDireccion = buscarDireccion;
    $scope.centrarUbicacion = centrarUbicacion;
    $scope.borrarMarcadores = borrarMarcadores; 

    InitializeComponents();

    //Inicializa el mapa y otros componentes
    function InitializeComponents() {
        var mapConfig = {
            center: { lat: -34.5711339, lng: -58.4786171 },
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        mapa = new google.maps.Map(document.getElementById('map'), mapConfig);
        geocoder = new google.maps.Geocoder();
    };

    //Busca diferentes ubicaciones segun la direccion dada
    function buscarDireccion() {   
      if (geocoder !== undefined) {
          geocoder.geocode(
              { address: $scope.view.addressInput },
              function (results, status) {
                  $scope.view.places = [];
                  $scope.view.selectedPlace = '';
                  switch (status) {
                      case google.maps.GeocoderStatus.OK:
                          //console.log('Results: ' + results);
                          $scope.view.places = results;
                          if (results.length < 2) {
                              $scope.view.selectedPlace = results[0].place_id;
                              $scope.view.addressInput = results[0].formatted_address;
                              //console.log('results: ');
                              //console.log(results);
                              $scope.view.addressObj = results[0];
                              //console.log('addressObj: ');
                              //console.log($scope.view.addressObj);
                              centrarUbicacion();
                          } else {
                              //console.log();
                              mostrarMensaje('Se han encontrado ' + $scope.view.places.length + ' ubicaciones');
                              break;
                            }
                      case google.maps.GeocoderStatus.ZERO_RESULTS:
                          mostrarMensaje('No se han encontrado resultados');
                          break;
                      case google.maps.GeocoderStatus.REQUEST_DENIED:
                          mostrarMensaje('La solicitud de búsqueda ha sido denegada');
                          break;
                      case google.maps.GeocoderStatus.INVALID_REQUEST:
                          mostrarMensaje('Solicitud inválida');
                          break;
                  }
                  $scope.$apply();
              }
          );
      }
    };

    //Posiciona en el centro de la vista del mapa la ubicacion seleccionada
    function centrarUbicacion() {
      var selected = _.find($scope.view.places, function (x) { return x.place_id === $scope.view.selectedPlace; });
      if ($scope.view.selectedPlace !== undefined & $scope.view.selectedPlace !== '') {
          var location = _.result(selected, 'geometry.location');
            //console.log('selectedPlace: ' + $scope.view.selectedPlace);
            //console.log('addressInput: ' + $scope.view.addressInput);
            //console.log('Location: ');
            //console.log(location);
          if (location !== undefined) {
              var marker = new google.maps.Marker({ position: location, map: mapa });
              $scope.view.markers.push(marker);
              $scope.view.addressObj = selected;
              mapa.setCenter(location);
              
              //console.log('Pruebaaaaa:');
              //console.log(selected);
              //console.log('location: ' + location);
              //console.log('$scope.view.selectedPlace: ' + $scope.view.selectedPlace);
              //console.log('$scope.view.addressInput: ' + $scope.view.addressInput);
          }
          else {
              mostrarMensaje('No se pudo mostrar la ubicación');
          }
      }
    };

    //Borra los marcadores del mapa
    function borrarMarcadores() {
      for (var i = 0; i < $scope.view.markers.length; i++) {
          $scope.view.markers[i].setMap(null);
      }
      $scope.view.markers = [];
    };

    //Muestra un mensaje toast (funcion base)
    function simpleToastBase(message, position, delay, action) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position(position)
                .hideDelay(delay)
                .action(action)
        );
    }

    //Muestra un mensaje toast
    function mostrarMensaje(mensaje) {
        simpleToastBase(mensaje, 'top right', 6000, 'X');
    }

    var blanquear = function() {
      $scope.producto_precio = "";
      $scope.producto_seleccionado = "";
      $scope.view.addressInput = "";
      $scope.view.selectedPlace = "";
    };

    $scope.loadProductos = function() {
      $scope.productosDesplegable = productService.getProducts();
    };

    $scope.postear = function(){
      var producto_id = $scope.producto_seleccionado.$id;
      var producto_precio = $scope.producto_precio;
      var mapaObj = $scope.view.addressObj;
      var lat = mapaObj.geometry.viewport.H.H;
      var lng = mapaObj.geometry.viewport.j.j;
      var formatted_address = mapaObj.formatted_address;
      var place_id = mapaObj.place_id;
      
      //console.log('Aca esta para postear!!!');
      //console.log($scope.view.addressObj);
      //console.log('formatted_address:');
      //console.log($scope.view.addressObj.formatted_address);
      //console.log('address_components:');
      //console.log($scope.view.addressObj.address_components);
      //console.log('lat y log: ');
      //console.log($scope.view.addressObj.geometry.viewport.H.H);
      //console.log($scope.view.addressObj.geometry.viewport.j.j);
      //console.log('place_id:');
      //console.log($scope.view.addressObj.place_id);
      //console.log('producto_id: ' + producto_id);
      //console.log('producto_precio' + producto_precio);
      productService.agregarPost({
        codProd: producto_id,
        precio: producto_precio,
        positivos: 0,
        negativos: 0,
        ubicacion: {lat: lat, lng: lng},
        formatted_address: formatted_address,
        place_id: place_id
      });

      blanquear();
    };

    //coleccion estática sobre la que voy a buscar por ahora...
    $scope.productosBuscar = [
    {
      img: 'img/products/savora.jpg',
      titulo: 'Savora Clásica',
      desc: 'The titles'
    },
    {
      img: 'img/products/aceitenatura.jpg',
      titulo: 'Aceitunas',
      desc: 'The titles'
    },
    {
      img: 'img/products/bucattiniluchetti.jpg',
      titulo: 'Fideos Bucattini',
      desc: 'The titles'
    },
    {
      img: 'img/products/cocacolalitroymedio.jpg',
      titulo: 'Coca Cola 1.5L',
      desc: 'The titles'
    },
    {
      img: 'img/products/laserenisima.jpg',
      titulo: 'Leche La Serenísima',
      desc: 'The titles'
    },
    {
      img: 'img/products/milaespinacagranja.jpg',
      titulo: 'Mila de Espinaca',
      desc: 'The titles'
    },
    {
      img: 'img/products/municioneslucheti.jpg',
      titulo: 'Fideos Municiones',
      desc: 'The titles'
    },
    {
      img: 'img/products/savora.jpg',
      titulo: 'Savora Clásica',
      desc: 'The titles'
    }
    ];



    //este parametro activa y desactiva el autocomplete.
    $scope.isDisabled    = false;
    // list of `state` value/display objects (antes recibia eso, ahora algo parecido pero con productos...)
    $scope.productos     = loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    $scope.newState = newState;

    function newState() {
      alert("Esto aún no estaría... ");
    }
    // ******************************
    // Internal methods
    // ******************************
    //Busca los productos, no entiendo bien como.
    function querySearch (query) {
      var results = query ? $scope.productos.filter( createFilterFor(query) ) : $scope.productos,
          deferred;
      return results;
    }
    //esto no se para que lo hacia, comenté la linea porque rompía.
    function searchTextChange(text) {
      //$log.info('Text changed to ' + text);
    }
    //esto no se para que lo hacia, comenté la línea porque rompía.
    function selectedItemChange(item) {
      //$log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Carga inicial de los productos, esto deberia llamar a un servicio quizas...
     En realidad ahora lo hice que quede en la raiz del controller, porque queria leerlo
     desde el html, pero no salio lo que queria hacer, puede ir aca o arriba, ver donde mejor.
     */
    function loadAll() {
      // var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
      //         Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
      //         Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
      //         Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
      //         North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
      //         South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
      //         Wisconsin, Wyoming';
      // return allStates.split(/, +/g).map( function (state) {
      //   return {
      //     value: state.toLowerCase(),
      //     display: state
      //   };
      // });
      //esto estaría haciendo una especie de mapeo? en la que retorna cosas clave/valor...parece
      return $scope.productosBuscar.map( function (prod) {
        return {
          value: prod.titulo.toLowerCase(),
          display: prod.titulo
        };
      });
    }

    /**
     * Esto busca por cadena.
     */
     //recibe lo que escribe el usuario
    function createFilterFor(query) {
      //lo pasa a minuscula
      var lowercaseQuery = angular.lowercase(query);
      //y aca ya no se cómo funciona...
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  }
]);
