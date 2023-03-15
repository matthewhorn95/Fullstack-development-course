/* eslint-disable no-unused-vars */
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

module.exports = {
    dummy,
    totalLikes,
    maxLikes
}