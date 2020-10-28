module.exports = {
    count: async (req, res) => {
        const data = await Bing.count();
        res.json({
            code: 0,
            data
        })
    },

    findAll:async (req, res) => {
        try {
            const data = await Bing.find();
            res.json({
                code: 0,
                data
            })
        } catch (err) {
            res.json(
                {
                    code: 1,
                    msg: "数据库错误"
                }
            )
        }
    },

    find: async (req, res) => {
        const { skip, limit } = req.query;
        if ((typeof skip === "number") && (typeof limit === "number")) {
            try {
                const data = await Bing.find().limit(limit).skip(skip);
                res.json({
                    code: 0,
                    data
                })
            } catch (err) {
                res.json(
                    {
                        code: 1,
                        msg: "数据库错误"
                    }
                )
            }
        } else {
            res.json({
                code: 1,
                msg: "参数不合法"
            })
        }
    },



    store: async (req, res) => {
        let { word, explain, url, fileName } = req.body;
        if (explain && url && fileName) {
            const fileTempUrl = path.join(dirPath, fileName)
            if (fs.existsSync(fileTempUrl)) {//文件已经存在
                try {
                    let data = await Bing.create({ word, explain, file: "file/" + fileName }).fetch();
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
                            let data = await Bing.create({ word, explain, file: "file/" + fileName }).fetch();
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
        } else {
            res.json({
                code: 404,
                msg: "你是来捣乱的吧？"
            })
        }
    },

    getStoreInfo: async (req, res) => {
        try {
            let data = await Bing.find({
                select: ['word']
            });
            res.json({
                code: 0,
                data
            });
        } catch (err) {
            res.json({
                code: 1,
                msg: err
            })
        }
    }

}