const request = require("request");

module.exports = {
    vocabulary: async (req, res) => {
        const { word } = req.query;
        request(`https://www.vocabulary.com/dictionary/${word}`, (err, __, data) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: err
                })
            } else {
                res.json({
                    code: 0,
                    data
                })
            }
        })
    },
    bing: async (req, res) => {
        const { word } = req.query;
        request(`https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=${word}`, (err, __, data) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: err
                })
            } else {
                res.json({
                    code: 0,
                    data
                })
            }
        })
    }
}