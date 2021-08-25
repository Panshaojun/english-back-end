module.exports = {
    tableName:"review_word",
    attributes: {
        rid:{type:'string',required: true},
        mark:{type:'string',defaultsTo: ""},
        comment:{type:'string',defaultsTo: ""}
    },
};