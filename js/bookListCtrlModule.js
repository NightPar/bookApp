(function(){
    angular.module("bookListCtrlModule",[])
        .controller("bookListController",["$scope","getDataService","IMAGEURL","myCart","localStorageService","USERSERVICE",function($scope,getDataService,IMAGEURL,myCart,localStorageService,USERSERVICE){
            $scope.IMAGEURL = IMAGEURL;
            if(localStorageService.getObj("myCart")){
                console.log("第二次");
                myCart = localStorageService.getObj("myCart");
            }else{
                console.log("第一次");
                // $scope.cartList = myCart.data;
                myCart= myCart;
            }
            $scope.addToCart = function(){
                // console.log(this.$index);
                var index = this.$index;
                var book = $scope.books[index];
                // console.log(book);
                if(myCart.data[book.id]){
                   myCart.data[book.id]['num']++;
                   localStorageService.setObj("myCart",myCart);
                }else {
                   myCart.data[book.id] = {
                       "id":book.id,
                       "title":book.title,
                       "price":book.price,
                       "num":1
                   };
                   localStorageService.setObj("myCart",myCart);
               }
               $scope.$watch(function(){
                   return myCart.data;
                   console.log(myCart.data);
               },function(){
                   var kind = 0;
                   for(var i in myCart.data){
                       kind++;
                   }
                   $scope.kind = kind;
               });
            };
            var books = localStorageService.getObj("books");
               if(books){
                //    console.log("第二次拿数据");
                   $scope.books = books;
               }else{
                //    console.log("第一次拿数据");
                   getDataService.requestData(
                       "book.php",
                       null,
                       function(data){
                           console.log(data);
                           console.log(data.data);
                           if(data.data.code===0){
                               $scope.books = data.data.data;
                               localStorageService.setObj("books",data.data.data);
                           }
                       },
                       function(error){
                           console.log(error);
                       }
                   );
               }
            $scope.$watch(function(){
                return myCart.data;
                console.log(myCart.data);
            },function(){
                var kind = 0;
                for(var i in myCart.data){
                    kind++;
                }
                $scope.kind = kind;
            },true)
            $scope.userservice = USERSERVICE.user;
            $scope.loginOut = function(){
                USERSERVICE.user = {isLogin:false};
                $scope.userservice = USERSERVICE.user;
            };
        }]);
})();
