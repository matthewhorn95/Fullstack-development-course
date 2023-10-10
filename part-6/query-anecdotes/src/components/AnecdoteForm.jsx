import anecdoteService from '../services/anecdotes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ mutationFn: anecdoteService.createNew,
                                            onSuccess: () => {
                                              queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
                                            } })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
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
