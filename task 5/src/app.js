const express = require('express')
const path = require('path')
const hbs = require('hbs')
const router = require('../routes/users.routes')

const viewsDirectoryPath = path.join(__dirname,'../resources/views')
const publicDirectoryPath = path.join(__dirname,'../resources/public')
const layoutsDirectoryPath = path.join(__dirname,'../resources/layouts')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicDirectoryPath))
app.use(router)

app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)

hbs.registerPartials(layoutsDirectoryPath)

module.exports = app