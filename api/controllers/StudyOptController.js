var fs = require("fs");
var path = require("path");
var request = require("request");
var dirPath = path.join(__dirname, "../../assets/file");

module.exports = {
    get: async (req, res) => {
        try {
            let data = await Study.find({});
            res.json({
                code: 0,
                data
            });
        } catch (err) {
            res.json({
                code: 1,
                data: err
            })
        }
    },

    upd: async (req, res) => {
        let { date, indexs } = req.body;
        if (date && indexs) {
            try {
                let createdRecord = await Study.create({ date, indexs }).fetch();
                res.json({
                    code: 0,
                    data: createdRecord
                });
            } catch (err) {
                res.json({
                    code: 1,
                    msg: err
                })
            }
        } else {
            res.json({
                code: 1,
                msg: "参数不合法！"
            });
        }
    },

    store: async (req, res) => {
        let { word,explain, url, fileName } = req.body;
        if (explain && url && fileName) {
            const fileTempUrl = path.join(dirPath, fileName)
            if (fs.existsSync(fileTempUrl)) {//文件已经存在
                try {
                    let data = await Bing.create({ word,explain, file: "file/" + fileName }).fetch();
                    if (data) {
                        res.json({
                            code: 0,
                            msg: "文件已存在,传输到数据库成功"
                        })
                    } else {
                        res.json({
                            code: 1,
                            msg: "文件已存在，数据库连接错误？"
                        })
                    }
                } catch (err) {
                    res.json({
                        code: 2,
                        msg: "文件已存在，数据库已存在"
                    })
                }
            } else {//文件未存在
                let stream = fs.createWriteStream(fileTempUrl);
                request(url).pipe(stream).on("close", async (err) => {
                    if (err) {
                        res.json({
                            code: 1,
                            msg: "文件下载失败"
                        })
                    } else {
                        try {
                            let data = await Bing.create({ word,explain, file: "file/" + fileName }).fetch();
                            if (data) {
                                res.json({
                                    code: 0,
                                    msg: "文件下载完毕,传输到数据库成功"
                                })
                            } else {
                                res.json({
                                    code: 1,
                                    msg: "文件下载完毕,数据连接错误？"
                                })
                            }
                        } catch (err) {
                            res.json({
                                code: 2,
                                msg: "文件下载完毕,数据库连接有问题"
                            })
                        }
                    }
                });
            }
        }else{
            res.json({
                code:404,
                msg:"你是来捣乱的吧？"
            })
        }
    },

    getStoreInfo: async (req,res)=>{
        try{
            let data=await Bing.find({
                select:['word']
            });
            res.json({
                code:0,
                data
            });
        }catch(err){
            res.json({
                code:1,
                msg:err
            })
        }
    }

}