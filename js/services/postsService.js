app.service('postsService', ['$q', function($q){

  var myDataRef = new Firebase('https://appreciar.firebaseio.com/Posts');

  this.getPosts = function(){

    var data = [];
    myDataRef.limitToLast(5).on("child_added", function(snapshot) {
        data.push(snapshot.val());
    });
    return data;
  }


}]);
