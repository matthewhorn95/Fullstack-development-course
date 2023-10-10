import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const incrementVoteMutation = useMutation({ mutationFn: anecdoteService.incrementVote,
                                            onSuccess: () => {
                                              queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
                                            }
  })
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    incrementVoteMutation.mutate(anecdote)
    dispatch({ type: "ADD", payload: `You voted for: ${anecdote.content}` })
    setTimeout(() => {
      dispatch({ type: "REMOVE" })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return (
      <div>
        Loading data...
      </div>
    )
  }

  if (result.isError) {
    return (
      <div>
        An error occurred when loading the data...
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
