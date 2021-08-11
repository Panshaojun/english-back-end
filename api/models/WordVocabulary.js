module.exports = {
    tableName:"word_vocabulary",
    attributes: {
        w: { type: 'string', required: true },
        short:{type:'string',required: false,defaultsTo:""},
        long:{type:'string',required: false,defaultsTo:""},
    },
};