(function(){
    angular.module("bookDetailCtrlModule",[])
        .controller("bookDetailController",["$scope","getDataService","IMAGEURL","$routeParams",function($scope,getDataService,IMAGEURL,$routeParams){
            $scope.IMAGEURL = IMAGEURL;
            getDataService.requestData(
                "bookId.php",
                {id:$routeParams.id},
                function(data){
                    console.log(data.data);
                    if(data.data.code===0){
                        $scope.book = data.data.data;
                    }
                },
                function(error){
                    console.log(error);
                }
            );
        }]);
})();
