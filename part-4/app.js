/* eslint-disable no-undef */
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
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

// Take middleware into use
app.use(middleware.requestLogger)

// Take routes into use
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

// Final error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app