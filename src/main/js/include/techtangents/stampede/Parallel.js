techtangents.stampede.Parallel = (function(stampede) {

    // static global pool
    var pool = stampede.util.ThreadPool.create(16);

    /** pmap - parallel map.
     *  Note: though parallel, this function is synchronous.
     *  @param array
     *  @param f
     *  @return an array parallel to the input array, with f applied to each element.
     */
    var pmap = function(array, f) {
        var len = array.length;
        var result = new Array(len);
        var future = new Array(len);

        function run(i) {
            var task = new java.util.concurrent.Callable({
                call: function() {
                    result[i] = f(array[i]);
                }
            });
            future[i] = pool.submit(task);
        }

        for (var i = 0; i < len; i++) run(i);
        for (var i = 0; i < len; i++) future[i].get();

        return result;
    };

    return {
        pmap: pmap
    };

})(techtangents.stampede);
