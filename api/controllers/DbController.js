module.exports = {
    getBing: async (req, res) => {
        const { ids } = req.body;
        if (ids) {
            try {
                const data = await Kaoyanbing.find({ id: ids });
                res.json({
                    code: 0,
                    data
                })
            }catch(e){
                res.json({
                    code:500,
                    msg:"系统错误"
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
            }catch(e){
                res.json({
                    code:500,
                    msg:"系统错误"
                })
            }
        } else {
            res.json({
                code: 121,
                msg: "参数错误"
            })
        } 
    }
}