const mongoose = require('mongoose');
const reqSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }


});

module.exports = mongoose.model('Request', reqSchema);





