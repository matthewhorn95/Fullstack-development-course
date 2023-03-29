const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.js')

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body

    const saltRounds = 10
    const encryptedPassword = bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        encryptedPassword,
        name
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const userById = await User.findById(request.params.id)
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })
  userById ? response.json(userById) : response.status(404).end()
})

module.exports = usersRouter