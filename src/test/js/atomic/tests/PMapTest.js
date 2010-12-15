require("../include/include.js");

function test() {

    var input = TestData.sequence(1000);

    var f = function(x) {
        java.lang.Thread.sleep(1, 0);
        return x + "_";
    }

    function serial() {
        return input.map(f);
    }

    function parallel() {
        return techtangents.stampede.Parallel.pmap(input, f);
    }

    function run(fn) {
        return Profiler.timed(fn);
    }

    function out(name, x) {
        var output = name + ": " + x.delta + " ms\n"
               + x.result;
        print(output);
    }

    var sResult = run("serial", serial);
    var pResult = run("parallel", parallel);

    jssert.assertEq(sResult, pResult);

    out("serial", sResult);
    out("parallel", pResult);
}
