import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (text) => {
    const anecdote = { content: text, votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const incrementVote = async(anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`,
                                       {...anecdote, votes: anecdote.votes + 1})
    return response.data
}

export default { getAll, createNew, incrementVote }