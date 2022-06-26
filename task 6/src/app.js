require('../database/connect')
const express = require('express')
const router = require('../routes/posts.routes')

const app = express()

app.use(express.json())
app.use('/post',router)

module.exports= app