const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const Blog = require('./models/blog.js')
// const blogsRouter = require('./controllers/blogs.js')
require('dotenv').config()

logger.info('connecting to mongo db')
mongoose.connect(config.URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// app.use('/api/blogs', blogsRouter)

module.exports = app