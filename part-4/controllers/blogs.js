const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    if(!body.ur || !body.title) {
      response.status(400).end()
    } else {
      const result = await blog.save()
      response.status(201).json(result)
    }
  })

module.exports = blogsRouter