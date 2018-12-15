const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = Schema({
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;