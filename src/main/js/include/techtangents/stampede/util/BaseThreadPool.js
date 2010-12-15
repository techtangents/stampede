techtangents.stampede.util.BaseThreadPool = (function(util) {

    var create = function(numThreads) {
        var javaPool = java.util.concurrent.Executors.newFixedThreadPool(numThreads);

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

        return {
            submit: submit
        };
    };

    /** Wrapper to a java fixed thread pool */
    return {
        create: create
    };

})(techtangents.stampede.util);