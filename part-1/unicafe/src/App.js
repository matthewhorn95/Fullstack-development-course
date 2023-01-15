import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {() => setGood(good + 1)} text = "good" />
      <Button onClick = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button onClick = {() => setBad(bad + 1)} text = "bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {good + bad + neutral}/>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad , all}) => {
  
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>)
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text = "good" val = {good}/></td>
          </tr>
          <tr>
            <td><StatisticLine text = "neutral" val = {neutral}/></td>
          </tr>
          <tr>
            <td><StatisticLine text = "bad" val = {bad}/></td>
          </tr>
          <tr>
            <td><StatisticLine text = "all" val = {all}/></td>
          </tr>
          <tr>
            <td><StatisticLine text = "average" val = {(good - bad)/all}/></td>
          </tr>
          <tr>
            <td><StatisticLine text = "positive" val = {good/all}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, val }) => {
  return (
    <p>{text} {val}</p>
  )
}

export default App