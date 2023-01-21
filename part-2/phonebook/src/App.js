import { useState } from 'react'
import Person from './components/Person.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 

 // state handling
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const filteredPersons = newFilter.length >= 1
    ? persons.filter(person => person.name.includes(newFilter) || person.number.includes(newFilter))
    : persons

  const addName = (event) => {
    event.preventDefault()
    const temp = [{ name: newName, number: newNumber}]
    if (!containsName(temp.name)) {
      setPersons(persons.concat(temp))
    } else {
      alert(`${newName} is already in the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    console.log("handled filter: ", event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNoteChange = (event) => {
    console.log("handled name: ", event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log("handled number: ", event.target.value)
    setNewNumber(event.target.value)
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
        <div>
          Filter entries that include: <input value={newFilter} onChange={handleFilterChange} />
        </div>
      <h2>New Entry:</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {filteredPersons.map(person => <Person key={person.name} person={person.name} number={person.number} />)}
        </ul>
      </div>
    </div>
  )
}

export default App