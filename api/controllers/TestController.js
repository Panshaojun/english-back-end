const fs = require("fs");
const path = require("path");
const request = require("request");
const dirPath = path.join(__dirname, "../../assets/file");

module.exports = {
    create: async (req, res) => {
        let { id, w, short, long } = req.body;
        if (id && w && short && long) {
            await Vocabularykaoyan.create({ id, w, short, long }).fetch();
            res.json({
                code: 0,
                msg: "成功了"
            })
        } else {
            res.json({
                code: 101,
                msg: "没有"
            })
        }
    },
    fetchfile: async (req, res) => {
        let { fileUrl,fileName } = req.body;
        if (fileUrl && fileName) {
            const fileTempUrl = path.join(dirPath, fileName)
            if (fs.existsSync(fileTempUrl)) {//文件已经存在
                res.json({
                    code: 2,
                    msg: "文件已存在"
                })
            } else {//文件未存在
                const stream = fs.createWriteStream(fileTempUrl);
                request(fileUrl).pipe(stream).on("close",(err) => {
                    if (err) {
                        res.json({
                            code: 1,
                            msg: "文件下载失败"
                        })
                    } else {
                        res.json({
                            code: 0,
                            msg: "文件下载完毕"
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
}