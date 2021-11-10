const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    tags: [String],
    desc: {
        type: String,
        required: true,

    },
    qty: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Books', bookSchema);