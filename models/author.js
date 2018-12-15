const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const authorSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    emailid: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: false,
        default: moment.utc().valueOf()
    },
    updatedAt: {
        type: Number,
        required: true,
        default: moment.utc().valueOf()
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
