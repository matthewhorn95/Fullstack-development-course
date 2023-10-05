import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </li>
    )
}

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if(state.filter === '') {
            return [...state.anecdotes].sort((a,b) => b.votes - a.votes)
        } else {
            return state.anecdotes
                .filter(a => a.content.includes(state.filter))
                .sort((a, b) => b.votes - a.votes);
        }
    })

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(voteFor(anecdote.id))}
                />
            )}
        </ul>
    )
}

export default AnecdoteList

