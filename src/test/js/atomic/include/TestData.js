var TestData = (function() {

    var sequence = function(x) {
        var r = [];
        for (var i = 0; i < x; i++) r.push(i);
        return r;
    };

    return {
        sequence: sequence
    };

})();
