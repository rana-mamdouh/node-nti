const express = require('express')
const hbs = require('hbs')
const path = require('path')
const postRoutes = require('../routes/post.route')

const app = express()

const viewsDirectoryPath = path.join(__dirname, '../resources/views')
const publicDirectoryPath = path.join(__dirname, '../resources/public')
const partialsDirectoryPath = path.join(__dirname, '../resources/layouts')

app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

hbs.registerPartials(partialsDirectoryPath)

app.use(postRoutes)

module.exports = app
