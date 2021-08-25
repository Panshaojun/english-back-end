module.exports = {
    tableName: "word_view",
    attributes: {
        b_w: { type: 'string', allowNull: true },
        definition: { type: 'json', columnType: "text" },
        audio: { type: 'json', columnType: "text" },
        word_change: { type: 'json', columnType: "text" },
        examples: { type: 'json', columnType: "text" },
        english_chinese: { type: 'json', columnType: "text" },
        idioms: { type: 'json', columnType: "text" },
        sider: { type: 'json', columnType: "text" },
        v_w: { type: 'string', allowNull: true },
        v_short: { type: 'string', allowNull: true },
        v_long: { type: 'string', allowNull: true },
    },
};