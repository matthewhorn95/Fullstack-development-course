/* eslint-disable no-unused-vars */
const  _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const summer = (sum, item) => sum + item.likes
    return blogs.reduce(summer, 0)
}

const maxLikes = (blogs) => {
    const findMaxReduce = (max, item) => {
        return Math.max(max, item)
    }

    return Math.max(blogs.map(b => b.likes).reduce(findMaxReduce, 0))
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')
    const bestAuthor = _.maxBy(_.keys(blogsByAuthor), (author) => blogsByAuthor[author].length)

    return {
        author: bestAuthor,
        blogs: blogsByAuthor[bestAuthor].length
    }
}

const mostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')
    const authorLikes = _.mapValues(blogsByAuthor, authorBlogs => _.sumBy(authorBlogs, 'likes'))
    const topAuthor = _.maxBy(_.keys(authorLikes), author => authorLikes[author])
    const topAuthorLikes = authorLikes[topAuthor]

    return {
        author: topAuthor,
        likes: topAuthorLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
    mostBlogs,
    mostLikes
}