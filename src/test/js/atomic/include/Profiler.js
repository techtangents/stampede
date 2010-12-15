// FIX sideways as project
var Profiler = (function() {

    function now() {
        return new Date().getTime();
    }

    function elapsed(start) {
        return now() - start;
    }

    function timed(f) {
        var start = now();
        var result = f();
        var delta = elapsed(start);
        return {
            result: result,
            delta: delta
        };
    }
    
    return {
        timed: timed
    };

})();