const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = express.Router()
const User = require('../models/user.js')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const correctUserPass = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(correctUserPass && user)) {
        return response.status(401).json({ error: "Incorrect username or password" })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter