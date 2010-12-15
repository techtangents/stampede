techtangents.stampede.util.JavaCallable = (function(util) {

    var create = function(f) {
        return new java.util.concurrent.Callable({
            call: function() {
                // by boxing the value, we prevent it from being coerced into a java type
                return { jsValue: f() };
            }
        });
    };

    return {
        create: create
    };

})(techtangents.stampede.util);