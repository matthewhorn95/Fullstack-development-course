import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createNew } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNew(content))
        dispatch(setNotification({text: `You created a new anecdote: ${content}`, timeout: 5}))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm