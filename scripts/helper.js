const get = require("get-value");
const moment = require("moment");

hexo.extend.helper.register('getConfig', function (...keys) {
    return keys.reduce((p, key) => (p || get(this.config, key) || get(this.theme, key)), void 0);
});

hexo.extend.helper.register("getValue",function(obj,key,defVal){
    return get(obj,key) || defVal;
})

hexo.extend.helper.register("log", function (obj) {
    console.log(obj);
});

hexo.extend.helper.register("sortDate", function (obj) {
    if (obj instanceof Array) {
        obj.sort(function (a, b) {
            if (!a.date) {
                a.date = moment();
            }
            if (!b.date) {
                a.date = moment();
            }
            if (a.date && b.date) {
                const val1 = a.date.toDate().getTime(),
                    val2 = b.date.toDate().getTime();
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                }
            }
        });
        return obj;
    }
    return obj;
});


hexo.extend.generator.register('time', function (locals) {
    return {
        path: 'time.html',
        data: {posts: locals.posts},
        layout: ['time']
    }
});
