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
    if (!containsName(temp.name)) {
      setPersons(persons.concat(temp))
    } else {
      alert(`${newName} is already in the phonebook`)
    }
    setNewName('')
  }

  const handleNoteChange = (event) => {
    console.log("handled", event.target.value)
    setNewName(event.target.value)
  }

  const containsName = () => {
    let contains = false

    for (let i = 0; i < persons.length; i++) {
      if (persons[i]["name"] === newName) {
        contains = true
      }
    }

    return (contains)
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