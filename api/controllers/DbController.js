const response = require("../../utils/response");
module.exports = {
    getMaxReviewId: async (req, res) => {
        try {
            var NAMES_OF_PETS_SQL = `use english;SELECT MAX(id) as id FROM review_word;`;
            // Send it to the database.
            var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL);
            res.json(response.ok(rawResult.rows[0].id))
        } catch (e) {
            res.json(response.err(500, e))
        }

    },
    getBing: async (req, res) => {
        const { ids } = req.body;
        if (ids) {
            try {
                const data = await Kaoyanbing.find({ id: ids });
                res.json({
                    code: 0,
                    data
                })
            } catch (e) {
                res.json({
                    code: 500,
                    msg: "系统错误"
                })
            }
        } else {
            res.json({
                code: 121,
                msg: "参数错误"
            })
        }
    },
    getVocabulary: async (req, res) => {
        const { ids } = req.body;
        if (ids) {
            try {
                const data = await Kaoyanvocabulary.find({ id: ids });
                res.json({
                    code: 0,
                    data
                })
            } catch (e) {
                res.json({
                    code: 500,
                    msg: "系统错误"
                })
            }
        } else {
            res.json({
                code: 121,
                msg: "参数错误"
            })
        }
    },
    SaveStudy: async (req, res) => {
        let { date, data } = req.body;
        if (data && data) {
            try {
                const rd = await ReviewDate.create({ date }).fetch();
                data = data.map(i => {
                    i.rid = rd.id;
                    return i;
                });
                await ReviewWord.createEach(data);
                res.json({
                    code: 0,
                    data:true,
                    msg: "保存成功！"
                })
            } catch (e) {
                res.json({
                    code: 121,
                    msg: "存储错误"
                })
            }
        }else{
            res.json({
                code: 121,
                msg: "参数错误"
            })
        }
    }
}