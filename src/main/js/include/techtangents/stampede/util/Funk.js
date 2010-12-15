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