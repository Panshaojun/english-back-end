const fs = require("fs");
const path = require("path");
const request = require("request");
const dirPath = path.join(__dirname, "../../assets/file");

module.exports = {
    aduio: async (req, res) => {
        let { fileUrl, fileName } = req.body;
        if (!fileUrl || !fileName) {
            return res.json({
                code: 400,
                msg: "参数错误"
            });
        }
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
    },
}