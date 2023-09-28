import { useSelector, useDispatch } from 'react-redux'
import { voteFor, createAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  const anecdotes = (useSelector(state => state).sort((a,b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App