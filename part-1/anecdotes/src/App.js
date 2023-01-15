import { useState } from 'react'
import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const countInit = new Array(anecdotes.length).fill(0)

  const [countArr, setCount] = useState(countInit)
   
  const [selected, setSelected] = useState(0)

  const updateCount = () => {
    const copy = [...countArr]
    copy[selected] += 1
    setCount(copy)
  }

  const getRand = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    if (rand === selected) {
      return((rand+1)%anecdotes.length)
    }
    return (rand)
  }

  return (
    <div>
      <div class="container">
        <h1>Anecdote of the day</h1>
        <p class="anecdote">{anecdotes[selected]}</p>
        <p>has {countArr[selected]} votes</p>
      </div>
      <div class="button">
        <Button onClick = {() => updateCount()} text = "Vote" />
        <Button onClick = {() => setSelected(getRand())} text = "Generate random anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>

      </div>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick = {onClick}>
      {text}
    </button>
  )
}

export default App
