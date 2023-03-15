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

const topAuthorLikes = (blogs) => {
    const counts = _.groupBy(blogs, 'author')
    console.log(counts)
    const bestAuthor = _.maxBy(_.keys(counts), (author) => counts[author].length)

    return {
        author: bestAuthor,
        blogs: counts[bestAuthor].length
    }
}

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
    topAuthorLikes
}