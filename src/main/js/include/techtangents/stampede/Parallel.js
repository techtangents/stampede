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
