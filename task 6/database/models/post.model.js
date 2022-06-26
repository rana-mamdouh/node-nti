const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true
    }
)

postSchema.methods.toJSON = function () {
    const post = this.toObject()
    delete post.__v
    delete post._id
    return post
}

const Post = mongoose.model('Post', postSchema)

module.exports = Post