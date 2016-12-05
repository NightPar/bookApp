(function(){
    angular.module("bookCartCtrlModule",[])
        .controller("bookCartController",["$scope","myCart","localStorageService","postDataService",function($scope,myCart,localStorageService,postDataService){
            if(localStorageService.getObj("myCart")){
                myCart = localStorageService.getObj("myCart");
                $scope.cartList = myCart.data;
            }else{
                myCart = myCart;
                $scope.cartList = myCart.data;
                console.log($scope.cartList);
            }
                    $scope.myCartAdd = function(id){
                        myCart.data[id].num++;
                        localStorageService.setObj("myCart",myCart);
                    };

                    $scope.myCartSub = function(id){
                        $scope.cartList[id]['num']--;
                        if(myCart.data[id].num<=0) {
                            delete myCart.data[id];
                        }
                        localStorageService.setObj("myCart",myCart);
                    };

                    $scope.$watch(
                            function(){
                                return myCart.data;
                            },
                            function(){
                                var keys = Object.keys(myCart.data);
                                var total=0;
                                for(var $i=0;$i<keys.length;$i++){
                                    total += myCart.data[keys[$i]].price * myCart.data[keys[$i]].num;
                                }
                                $scope.total =total;
                            },
                            true
                    );
                    $scope.submitOrder = function(){
                        console.log(myCart);
                        postDataService.postRequestData(
                            "order.php",
                            {
                                user_id:1,
                                cart:myCart.data
                            },
                            function(data){
                                if(data.code===0){
                                    alert(data.data);
                                }else{
                                    console.log(data.data);
                                }
                            },
                            function(error){
                                console.log(error);
                            }
                        );
                    };
        }]);
})();
