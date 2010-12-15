techtangents.stampede.util.Future = (function(util) {

    var create = function(javaFuture) {
        var get = function() {
            return javaFuture.get().jsValue;
        };

        return {
            get: get
        };
    };

    return {
        create: create
    };

})(techtangents.stampede.util);