import { useState } from 'react'
import Person from './components/Person.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const temp = [{ name: newName}]
    setPersons(persons.concat(temp))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    console.log("handled", event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => <Person key={person.name} person={person.name} />)}
        </ul>
      </div>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App