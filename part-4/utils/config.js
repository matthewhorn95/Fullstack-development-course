require('dotenv').config()

const URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const PORT = 3003

module.exports = {
    URI,
    PORT
}