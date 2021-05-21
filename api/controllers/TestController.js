module.exports = {
    create: async (req, res) => {
        let { id,w,short,long } = req.body;
        if(id&&w&&short&&long){
            await Vocabularykaoyan.create({ id,w,short,long }).fetch();
            res.json({
                code:0,
                msg:"成功了"
            })
        }else{
            res.json({
                code:101,
                msg:"没有"
            })
        }
    },
}