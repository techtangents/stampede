require("../include/include.js");

function test() {

    var input = TestData.sequence(1000);

    var para = techtangents.stampede.Parallel;

    var f = function(x) {
        return x + "_";
    }

    function serial() {
        return input.map(f);
    }

    function loop() {
        var len = input.length;
        var r = new Array(len);
        for (var i = 0; i < len; i++) {
            r[i] = f(i);
        }
        return r;
    }

    function parallel() {
        return para.pmap(input, f);
    }

    var results = {
        map: Profiler.timed("Array.prototype.map", serial),
        loop: Profiler.timed("loop", loop),
        parallel: Profiler.timed("parallel", parallel)
    };

    // FIX: use jssert
    assertArrayEquals(results.map, results.parallel);
}
