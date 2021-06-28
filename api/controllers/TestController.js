const fs = require("fs");
const path = require("path");
const request = require("request");
const dirPath = path.join(__dirname, "../../assets/file");

module.exports = {
    fetchfile: async (req, res) => {
        let { fileUrl, fileName } = req.body;
        if (fileUrl && fileName) {
            const fileTempUrl = path.join(dirPath, fileName)
            if (fs.existsSync(fileTempUrl)) {//文件已经存在
                res.json({
                    code: 0,
                    data: "/file/" + fileName
                })
            } else {//文件未存在
                const stream = fs.createWriteStream(fileTempUrl);
                request(fileUrl).pipe(stream).on("close", (err) => {
                    if (err) {
                        res.json({
                            code: 0,
                            data: fileUrl
                        })
                    } else {
                        res.json({
                            code: 0,
                            msg: "/file/" + fileName
                        })
                    }
                });
            }
        } else {
            res.json({
                code: 400,
                msg: "参数错误"
            })
        }
    },
    vocabulary: async (req, res) => {
        const { word } = req.query;
        request(`https://www.vocabulary.com/dictionary/${word}`, (err, res1, data) => {
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
        request(`https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=${word}`, (err, res1, data) => {
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