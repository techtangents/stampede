// FIX sideways as project
var Profiler = (function() {

    function now() {
        return new Date().getTime();
    }

    function elapsed(start) {
        return now() - start;
    }

    function timed(message, f) {
        var start = now();
        var result = f();
        var delta = elapsed(start);
        print(message + ": " + delta + " ms");
        return result;
    }
    
    return {
        timed: timed
    };

})();