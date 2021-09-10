module.exports = {
    tableName:"review_word",
    attributes: {
        rid:{type:'number',required: true},
        mark:{type:'string',defaultsTo: ""},
        comment:{type:'string',defaultsTo: ""}
    },
};