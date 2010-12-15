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

    function parallel() {
        return para.pmap(input, f);
    }

    function run(fn) {
        return Profiler.timed(fn);
    }

    function out(name, x) {
        var output = name + ": " + x.delta + " ms\n"
               + x.result;
        print(output);
    }

    var sResult = run(serial);
    var pResult = run(parallel);

    // FIX: use jssert
    assertArrayEquals(sResult.result, pResult.result);

    out("serial", sResult);
    out("parallel", pResult);
}
