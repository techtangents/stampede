(function() {
    var base = "include/techtangents/stampede/";
    var util = base + "util/";

    return Ephox.core.include.require("stampede", [
        base + "_.js",
        util + "_.js",

        util + "ThreadPool.js",
        base + "Parallel.js"
    ]);
})();

