const postModel = require('../database/models/post.model')

class Post {
    static insert = async (req, res) => {
        try {
            const post = postModel(req.body)

            await post.save()

            res.status(200).send({
                apiStatus: true,
                data: post,
                message: 'User added successfully!'
            })
        }
        catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: 'Error while adding user!'
            })
        }
    }

    static showSingle = async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id)

            res.status(200).send({
                apiStatus: true,
                data: post,
                message: 'Data fetched successfully!'
            })
        } catch (error) {

            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static showAll = async (req, res) => {
        try {
            const allPosts = await postModel.find()
            res.status(200).send({
                apiStatus: true,
                data: allPosts,
                message: 'Data fetched successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static delete = async (req, res) => {
        try {
            const post = await postModel.findByIdAndDelete(req.params.id)
            if (post)
                res.status(200).send({
                    apiStatus: true,
                    data: post,
                    message: "Deleted successfully!"
                })
            else
                throw new Error("Post not found")
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static update = async (req, res) => {
        try {
            const post = await postModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { runValidators: true }
            )
            if (post)
                res.status(200).send({
                    apiStatus: true,
                    data: post,
                    message: "Data updated successfully!"
                })
            else
                throw new Error("Post not found")
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }
}

module.exports = Post