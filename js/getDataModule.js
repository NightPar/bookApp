(function(){
    angular.module("getDataModule",[])
        .service("getDataService",["$http","HOSTURL",function($http,HOSTURL){
            this.requestData = function(url,data,success,error){
                $http.get(HOSTURL+url,{params:data})
                    .then(success,error);
            };
        }]);
})();
