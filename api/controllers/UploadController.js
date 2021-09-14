const fs = require("fs");
const path = require("path");
const request = require("request");
const dirPath = path.join(__dirname, "../../assets/file");

module.exports = {
    aduio: async (req, res) => {
        let { id, fileUrl, fileName } = req.body;
        if (!id || !fileUrl || !fileName) {
            return res.json({
                code: 400,
                msg: "参数错误"
            });
        }
        const dbData=await AudioFile.findOne({id});
        if(dbData){
            return res.json({
                code:0,
                data:dbData.path
            })
        }
        const fileTempUrl = path.join(dirPath, fileName)
        if (fs.existsSync(fileTempUrl)) {//文件已经存在
            const path = "/file/" + fileName;
            await AudioFile.create({ id, path });
            return res.json({
                code: 0,
                data: path
            })
        } else {//文件未存在
            const stream = fs.createWriteStream(fileTempUrl);
            request(fileUrl).pipe(stream).on("close",async (err) => {
                if (err) {
                    res.json({
                        code: 0,
                        data: fileUrl
                    })
                } else {
                    const path = "/file/" + fileName;
                    await AudioFile.create({ id, path });
                    res.json({
                        code: 0,
                        msg: path
                    })
                    
                }
            });
        }
    },
}