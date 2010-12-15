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