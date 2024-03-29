import anecdoteService from '../services/anecdotes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ mutationFn: anecdoteService.createNew,
                                            onSuccess: () => {
                                              queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
                                            },
                                            onError: () => {
                                              dispatch({ type: "ADD", payload: 'New anecdote creation failed. Make sure it is at least 5 characters long.' })
                                              setTimeout(() => {
                                                dispatch({ type: "REMOVE" })
                                              }, 5000)
                                            }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    dispatch({ type: "ADD", payload: `You created new anecdote: ${content}` })
    setTimeout(() => {
      dispatch({ type: "REMOVE" })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
