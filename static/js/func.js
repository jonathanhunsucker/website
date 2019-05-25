export default class Func {
    static min(a, b) {
        return Math.min(a, b);
    }
    static max(a, b) {
        return Math.max(a, b);
    }
    static add(a, b) {
        return a + b;
    }
    static cross(as, bs) {
        var set = [];
        as.forEach((a) => {
            bs.forEach((b) => {
                set.push([a, b]);
            });
        });

        return set;
    }
    static merge(a, b) {
        var x = {};

        var append = (entry) => {
            x[entry[0]] = entry[1];
        };

        Object.entries(a).forEach(append);
        Object.entries(b).forEach(append);

        return x;
    }
    static range(begin, end) {
        var r = [];
        for (var i = begin; i <= end; i++) {
            r.push(i);
        }
        return r;
    }
}
