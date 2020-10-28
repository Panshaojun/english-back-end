var fs = require("fs");
var path = require("path");
var request = require("request");
var dirPath = path.join(__dirname, "../../assets/file");

module.exports = {
    find: async (req, res) => {
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

    create: async (req, res) => {
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

    

}