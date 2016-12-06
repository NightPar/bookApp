(function(){
    angular.module("postDataModule",[])
        .provider("postDataService",function(){
            this.$get = ["$http","HOSTURL",function($http,HOSTURL){
                return {
                    postRequestData:function(url,data,success,error){
                        $http.post(HOSTURL+url,data)
                            .then(success,error);
                    }
                };
            }];
        });
})();
