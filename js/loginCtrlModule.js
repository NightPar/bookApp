(function(){
    angular.module("loginCtrlModule",[])
        .controller("loginController",["$scope","$location","$http","HOSTURL","$httpParamSerializer","USERSERVICE",function($scope,$location,$http,HOSTURL,$httpParamSerializer,USERSERVICE){
            $scope.loginClick = function(){
                $http.post(
                    HOSTURL+"userInfoLogin.php",
                    $httpParamSerializer(
                        {
                            username:$scope.user.name,
                            password:hex_md5($scope.user.password)
                        }
                    ),
                    {
                        headers:{
                            'Content-Type':"application/x-www-form-urlencoded"
                        }
                    }
                ).then(function(data){
                    // console.log(data);
                    if(data.data.code===0){
                        // console.log(data);
                        USERSERVICE.user={
										isOrderName : data.data.data[0]['user_name']
									};
                        // USERSERVICE.user = data.data.data;
                        USERSERVICE.user.isLogin = true;
                        $location.path("/bookList");
                    }else{
                        console.log(data.data.data);
                    }
                },function(error){
                    console.log(error);
                });

            };

        }]);
})();
