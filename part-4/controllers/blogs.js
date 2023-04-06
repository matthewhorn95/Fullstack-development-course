const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
// const { info, error } = require('../utils/logger.js')

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
  const blogById = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1, id: 1 })
  blogById ? response.json(blogById) : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

    if(!body.url || !body.title) {
      response.status(400).end()
    } else {
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
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