const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const blogById = await Blog.findById(request.params.id)
  blogById ? response.json(blogById) : response.status(404).end()
})

blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    if(!body.url || !body.title) {
      response.status(400).end()
    } else {
      const result = await blog.save()
      response.status(201).json(result)
    }
  })

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    { title, author, url, likes },
    { new: true }
  )
  response.json(updatedBlog)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(404).end()
})

module.exports = blogsRouter