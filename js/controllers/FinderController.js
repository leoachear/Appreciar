app.controller('FinderController', ['$scope','productService', function ($scope, productService, $log){
    //'use strict';//tenia esto no se bien para que, investigue que es pero no lo entendi del todo menos
    //teniendo en cuenta que funciona igual si lo saco...

    //aca como que hace una variable de si mismo...
    //supongo que usando directamente el scope que recibo arriba (obvio para todo)
    //deberia funcionar, pero no probé...
    //var $scope = this;

    $scope.loadProductos = function() {
      console.log("Entra al loadProductos!");
      $scope.productosDesplegable = productService.getProducts();

      console.log($scope.productosDesplegable);
    }

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
