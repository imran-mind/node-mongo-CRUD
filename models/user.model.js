const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    expenses:  [{
        type: Schema.Types.ObjectId,
        ref: "expsens"
    }],
    dueAmount:{
        type: Number,
        default: 0
    },
    settlementAmount:{
        type: Number,
        default: 0
    },
    isAdminApproved:{
        type: Boolean,
        default: false
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

const Users = mongoose.model('users', userSchema);

module.exports = Users;