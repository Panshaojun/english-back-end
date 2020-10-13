module.exports = {
    attributes: {
        word: { type: 'string', required: true, unique: true },
        explain: { type: 'json', required: true },
        file: { type: 'string', required: true }
    },
};