require("../include/include.js");

function check(name, f) {
    print("------------------------ " + name);
    var input = TestData.sequence(10000);

    var para = techtangents.stampede.Parallel;

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

    function loopWithRunnable() {
        var len = input.length;
        var r = new Array(len);
        for (var i = 0; i < len; i++) {
            new java.lang.Runnable({
                run: function() {
                    r[i] = f(i);
                }
            }).run();
        }
        return r;
    }

    function parallel() {
        return para.pmap(input, f);
    }

    var results = {
        map: Profiler.timed("Array.prototype.map", serial),
        loop: Profiler.timed("loop", loop),
        loopWithRunnable: Profiler.timed("loopWithRunnable", loopWithRunnable),
        parallel: Profiler.timed("parallel", parallel)
    };

    // FIX: use jssert
    assertArrayEquals(results.map, results.parallel);
}

function test() {
    var id = function(x) {
        return x;
    };

    var append = function(x) {
        return x + "_";
    };

    var spin = function(x) {
        for (var i = 0; i < 100; i++){}
        return x;
    }

    var spin2 = function(x) {
        for (var i = 0; i < 10000; i++){}
        return x;
    }

    check("id", id);
    check("append", append);
    check("spin", spin);
    check("spin2", spin2);

    print("----------------------------------")
}
