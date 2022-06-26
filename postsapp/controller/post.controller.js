const dealWithJson = require('./dealWithJson.controller')

class Post {
    static home = (req, res) => {
        const data = dealWithJson.readDataFromJSON('models/posts.json')
        res.render('home', {
            pageTitle: "All Posts",
            data,
            isEmpty: !data.length
        })
    }

    static add = (req, res) => {
        if (req.query.title) {
            const post = { ...req.query, id: Date.now() }
            const data = dealWithJson.readDataFromJSON('models/posts.json')
            data.push(post)
            dealWithJson.writeDataToJSON('models/posts.json', data)
            res.redirect('/')
        } else
            res.render('add', {
                pageTitle: "Add Post"
            })
    }

    static addPost = (req, res) => {
        res.render("addpost", {
            pageTitle: "Add Post"
        })
    }

    static addPostLogic = (req, res) => {
        const post = { ...req.body, id: Date.now() }
        const data = dealWithJson.readDataFromJSON("models/posts.json")
        data.push(post)
        dealWithJson.writeDataToJSON("models/posts.json", data)
        res.redirect("/")
    }

    static edit = (req, res) => {
        const postId = req.params.id
        const data = dealWithJson.readDataFromJSON("models/posts.json")
        
        const post = data.find((post) => {
            return post.id == postId
        })

        res.render('edit', {
            packageTitle: "Edit Post",
            data: post
        })
    }

    static editPostLogic = (req, res) => {
        const postId = req.params.id
        const data = dealWithJson.readDataFromJSON("models/posts.json")

        const postIndex = data.findIndex((post) => {
            return post.id == postId
        })

        console.log(req.body)
        data[postIndex] = { id: req.params.id,  ...req.body }

        console.log(data[postIndex])
        dealWithJson.writeDataToJSON("models/posts.json", data)
        res.redirect("/")
    }

    static single = (req, res) => {
        const postId = req.params.id
        const data = dealWithJson.readDataFromJSON("models/posts.json")

        const post = data.find((post) => {
            return post.id == postId
        })

        res.render('single', {
            pageTitle: "Show Post",
            post
        })
    }

    static delete = (req, res) => {
        const postId = req.params.id

        const data = dealWithJson.readDataFromJSON("models/posts.json")

        const filteredPosts = data.filter((post) => {
            return post.id != postId
        })

        dealWithJson.writeDataToJSON("models/posts.json", filteredPosts)
        res.redirect("/")
    }
}

module.exports = Post