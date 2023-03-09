require('dotenv').config()

const URI = process.env.MONGODB_URI
const PORT = 3003

module.exports = {
    URI,
    PORT
}