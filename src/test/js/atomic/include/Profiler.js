// FIX sideways as project
var Profiler = (function() {

    function now() {
        return new Date().getTime();
    }

    function delta(start) {
        return now() - start;
    }

    function log(message, elapsed) {
        print(message + ": " + elapsed + " ms");
    }

    function time(f) {
        var start = now();
        var result = f();
        var elapsed = delta(start);
        return {
            result: result,
            elapsed: elapsed
        };
    }

    function timed(message, f) {
        var r = time(f);
        log(message, r.elapsed);
        return r.result;
    }

    function acc(message) {
        var elapsed = 0;

        return {
            acc: function(f) {
                var r = time(f);
                elapsed += r.elapsed;
                return r.result;
            },
            done: function() {
               log(message, elapsed);
            }
        };
    }
    
    return {
        timed: timed,
        acc: acc
    };

})();