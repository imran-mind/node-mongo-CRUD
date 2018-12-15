const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: false },
    category : { type: String, required: false }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
