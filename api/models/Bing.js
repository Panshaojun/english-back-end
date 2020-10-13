module.exports = {
    attributes: {
        word: { type: 'string', required: true, unique: true },
        explain: { type: 'string', required: true },
        file: { type: 'string', required: true }
    },
};