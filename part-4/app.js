const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const Blog = require('./models/blog.js')
const blogsRouter = require('./controllers/blogs.js')
require('dotenv').config()

logger.info('connecting to mongo db')
mongoose.connect(config.URI)
    .then(() => {
        logger.info('connected successfully')
    })
    .catch((error) => {
        logger.error('error connecting: ', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/', blogsRouter)

module.exports = app