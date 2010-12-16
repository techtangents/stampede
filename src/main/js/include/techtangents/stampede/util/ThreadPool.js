techtangents.stampede.util.ThreadPool = (function(util) {

    var create = function(numThreads) {
        var cc = java.util.concurrent;

        var baseTF = cc.Executors.defaultThreadFactory();

        var factory = new cc.ThreadFactory({
            newThread: function(r) {
                var t = baseTF.newThread(r);
                t.setDaemon(true);
                return t;
            }
        });

        return cc.Executors.newFixedThreadPool(numThreads, factory);
    };

    return {
        create: create
    };

})(techtangents.stampede.util);