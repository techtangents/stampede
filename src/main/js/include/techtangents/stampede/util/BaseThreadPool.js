techtangents.stampede.util.BaseThreadPool = (function(util) {

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

        var javaPool = cc.Executors.newFixedThreadPool(numThreads, factory);

        /** Submits a js function as a task.
         *  @param task: function
         *  @return {get: function} get blocks and yields task's return value
         */
        function submit(task) {
            var javaCallable = util.JavaCallable.create(task);
            var javaFuture = javaPool.submit(javaCallable);
            var future = util.Future.create(javaFuture);

            return {
                get: future.get
            };
        }

        function drain() {
            pool.shutdown();
        }

        return {
            submit: submit,
            drain: drain
        };
    };

    /** Wrapper to a java fixed thread pool */
    return {
        create: create
    };

})(techtangents.stampede.util);