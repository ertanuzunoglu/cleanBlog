const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: String,
    title: String,
    description: String,
    detail: String,
    dateCreatedShow: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
