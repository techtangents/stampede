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

    function run(name, fn) {
        var x = Profiler.timed(fn);
        var output = name + ": " + x.delta + " ms\n"
                   + x.result;
        print(output);
    }

    run("serial", serial);
    run("parallel", parallel);
}
