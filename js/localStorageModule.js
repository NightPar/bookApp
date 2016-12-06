(function(){
    angular.module("localStorageModule",[])
        .provider("localStorageService",function(){
            this.$get = ["$window",function($window){
                return {
                    get:function(key){
                        return $window.localStorage[key];
                    },
                    set:function(key,value){
                        $window.localStorage[key] = value;
                    },
                    getObj:function(key){
                        try{
                            var obj = $window.localStorage[key];
                            return JSON.parse(obj);
                        }catch(e){
                            return null;
                        }
                    },
                    setObj:function(key,value){
                        $window.localStorage[key] = JSON.stringify(value);
                    }
                };
            }];
        });
})();
