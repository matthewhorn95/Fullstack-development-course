/* eslint-disable no-undef */
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware.js')
require('dotenv').config()

// connect to database
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

app.use(middleware.requestLogger)

// take imported blogsRouter route into use
app.use('/', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app