const Segment = require('segment');
const getVal = require("get-value");
const moment = require("moment");
const {stripHTML, truncate} = require('hexo-util');
// 创建实例
const segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

hexo.extend.generator.register("search", function (locals) {
    const posts = locals.posts.sort('-date');
    const result = [];
    posts.forEach(r => {
        let content = removeHTMLTag(r.content);
        const res = segment.doSegment(content, {
            simple: true
        });
        result.push({
            word: res,
            url: r.permalink,
            title: r.title,
            content: truncate(stripHTML(r.content), {length: 120}),
            cover_picture: r.cover_picture,
            author: r.author || this.config.author,
            categorie: {
                url: getVal(r, "categories.data.0.permalink"),
                name: getVal(r, "categories.data.0.name")
            },
            date: moment(r.date).format("YYYY-MM-DD HH:mm:ss")
        })
    })
    return {
        path: "search.json",
        data: JSON.stringify(result)
    };
})


function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    str = str.replace(/&lt;/ig, '');
    str = str.replace(/&gt;/ig, '');
    str = str.replace(/[div|\/div]/g, '');
    str = str.replace(/&lt;[ -~]*&gt;/ig, '');//去掉替换后的<>标签
    return str;
}
