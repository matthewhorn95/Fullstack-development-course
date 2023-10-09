import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const anecdote = { content, votes: 0 }
    const res = await axios.post(baseUrl, anecdote)
    return res.data
}

const incrementVote = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}/${id}`)
        const anecdoteToIncrement = res.data
        const incrementedAnecdote = {...anecdoteToIncrement, votes: anecdoteToIncrement.votes + 1}
        await axios.put(`${baseUrl}/${id}`, incrementedAnecdote)
    } catch (error) {
        console.log(error)
    }

}

export default {
    getAll,
    createNew,
    incrementVote }