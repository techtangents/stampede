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
        var len = array.length;
        var result = new Array(len);
        var future = new Array(len);

        function run(i) {
            var task = function() {
                result[i] = f(array[i]);
            };
            future[i] = pool.submit(task);
        }

        for (var i = 0; i < len; i++) {
            run(i);
        }

        for (var i = 0; i < len; i++) {
            future[i].get();
        }

        return result;
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
