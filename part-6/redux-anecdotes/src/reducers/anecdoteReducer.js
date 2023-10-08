import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const noteToIncrement = state.find(a => a.id === id)
      const incrementedNote = { ...noteToIncrement, votes: noteToIncrement.votes + 1 }
      return state.map(a => a.id === id ? incrementedNote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer