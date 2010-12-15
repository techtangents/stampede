(function() {
    var base = "include/techtangents/stampede/";
    var util = base + "util/";

    return Ephox.core.include.require("stampede", [
        base + "_.js",
        util + "_.js",

        util + "BaseThreadPool.js",
        util + "Funk.js",
        util + "Future.js",
        util + "JavaCallable.js",

        base + "Pool.js",
        base + "Parallel.js"
    ]);
})();

