module.exports = {
    attributes: {
        key: { type: 'string', required: true },
        definition:{type:'json',required: true,columnType:"text"},
        audio:{type:'json',required: true,columnType:"text"},
        word_change:{type:'json',required: true,columnType:"text"},
        examples:{type:'json',required: true,columnType:"text"},
        english_chinese:{type:'json',required: true,columnType:"text"},
        idioms:{type:'json',required: true,columnType:"text"},
        sider:{type:'json',required: true,columnType:"text"},
    },
};