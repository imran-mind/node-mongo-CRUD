const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const expsensSchema = new Schema({
    item: {
        type: String
    },
    amount: {
        type: String
    },
    date: {
        type: Number
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt: {
        type: Number,
        default: moment().valueOf()
    },
});

const Expenses = mongoose.model('expsens', expsensSchema);

module.exports = Expenses;