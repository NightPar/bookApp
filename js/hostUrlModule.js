(function(){
    angular.module("hostUrlModule",[])
        .constant("HOSTURL","http://localhost/Angular10/book/")
        .constant("IMAGEURL","http://localhost/Angular10/images/")
        .constant("USERSERVICE",{userservice:{isLogin:false,isOrderName:""}});
})();
