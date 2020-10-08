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
    }
}