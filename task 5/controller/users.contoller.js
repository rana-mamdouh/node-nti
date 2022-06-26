const dbConnect = require('../db/connect')
const { ObjectId } = require('mongodb')
class User {
    static home = (req, res) => {
        dbConnect((db) => {
            db.collection('user')
                .find()
                .toArray()
                .then((users) => {
                    res.render('home', {
                        pageTitle: 'Home',
                        users,
                        isEmpty: !users.length
                    })
                })
        })

    }

    static add = (req, res) => {
        res.render('add', {
            pageTitle: 'Add User'
        })
    }

    static addPost = (req, res) => {
        console.log(req.body)
        res.redirect("/")
        dbConnect((db) => {
            db.collection('user')
                .insertOne(req.body)
                .then(() => res.redirect("/"))
                .catch((error) => console.log(error))
        })
    }

    static edit = (req, res) => {
        dbConnect((db) => {
            db.collection('user')
                .findOne({ _id: new ObjectId(req.params.id) })
                .then((user) =>
                    res.render('edit', {
                        pageTitle: 'Edit User',
                        user,
                        isActive: user.status == 'Active' ? true : false
                    }))
                .catch((error) => console.log(error))
        })
    }

    static editPost = (req, res) => {
        dbConnect((db) => {
            db.collection('user')
                .updateOne({ _id: new ObjectId(req.params.id) },
                    { $set: req.body }
                )
                .then(res.redirect('/'))
                .catch((error) => console.log(error))
        })
    }

    static show = (req, res) => {
        dbConnect((db) => {
            db.collection('user')
                .findOne({ _id: new ObjectId(req.params.id) })
                .then((user) => {
                    res.render('show', {
                        pageTitle: 'Show User',
                        user
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    static delete = (req, res) => {
        dbConnect((db) => {
            db.collection('user')
                .deleteOne({ _id: new ObjectId(req.params.id) })
                .then(res.redirect("/"))
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    static changeStatus = (req, res) => {
        dbConnect((db) => {
            db.collection('user')
                .findOne({ _id: new ObjectId(req.params.id) })
                .then((user) => {
                    db.collection('user')
                        .updateOne({ _id: new ObjectId(req.params.id) },
                            {
                                $set: {
                                    status: user.status == 'Active' ? 'Inactive' : 'Active'
                                }
                            }
                        )
                        .then(res.redirect('/'))
                        .catch((error) => console.log(error))
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

}

module.exports = User