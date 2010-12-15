this.techtangents = this.techtangents || {};
techtangents.stampede = techtangents.stampede || {};
techtangents.stampede.util = techtangents.stampede.util || {};
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
techtangents.stampede.util.Funk = (function() {

    var bindArgs = function(f, args) {
        return function() {
            return f.apply(null, args);
        };
    };

    return {
        bindArgs: bindArgs
    };

})();
techtangents.stampede.util.Future = (function(util) {

    var create = function(javaFuture) {
        var get = function() {
            return javaFuture.get().jsValue;
        };

        return {
            get: get
        };
    };

    return {
        create: create
    };

})(techtangents.stampede.util);
techtangents.stampede.util.JavaCallable = (function(util) {

    var create = function(f) {
        return new java.util.concurrent.Callable({
            call: function() {
                // by boxing the value, we prevent it from being coerced into a java type
                return { jsValue: f() };
            }
        });
    };

    return {
        create: create
    };

})(techtangents.stampede.util);
techtangents.stampede.Pool = (function(stampede) {

    var create = function(numThreads) {

        var basePool = stampede.util.BaseThreadPool.create(numThreads);

        /** submits a task
         *  @param f - function to invoke
         *  @params callback (optional) - invoked with the return value of f
         *  @return {get: function}} get blocks until f completes, and returns f's return value
         */
        var submit = function(f, callback) {
            var task = function() {
                var result = f();
                callback && callback(result);
                return result;
            };

            var future = basePool.submit(task);
            return {
                get: future.get
            };
        };

        /** submits a task
         *  @param f
         *  @param args
         *  @params callback (optional) - invoked with the return value of applying args to f
         *  @return future: {get: function}} get blocks until f completes, and returns f's return value
         */
        var submitWithArgs = function(f, args, callback) {
            return submit(
                stampede.util.Funk.bindArgs(f, args),
                callback
            );
        };

        return {
            submit: submit,
            submitWithArgs: submitWithArgs
        };
    };

    return {
        create: create
    };

})(techtangents.stampede);
techtangents.stampede.Parallel = (function(stampede) {

    // static global pool
    var pool = stampede.Pool.create(16);

    var startAll = function(array, f) {
        return array.map(function(x) {
            return pool.submitWithArgs(f, [x]);
        });
    };

    /** pmap - parallel map.
     *  Note: though parallel, this function is synchronous.
     *  @param array
     *  @param f
     *  @return an array parallel to the input array, with f applied to each element.
     */
    var pmap = function(array, f) {
        var t = startAll(array, f);
        return t.map(function(x) {
            return x.get();
        });
    };

    /** pmap - parallel each.
     *  Note: though parallel, this function is synchronous.
     *  @param array
     *  @param f - function applied to each element of input array. Return value is ignored.
     */
    var peach = function(array, f) {
        var t = startAll(array, f);
        t.forEach(function(x) {
            x.get();
        });
    };

    return {
        pmap: pmap,
        peach: peach
    };

})(techtangents.stampede);
