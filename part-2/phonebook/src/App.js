import { useState } from 'react'
import Filter from './components/Filter.js'
import PersonsList from './components/PersonsList.js'
import Form from './components/Form.js'

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
        <Filter filter={newFilter} handler={handleFilterChange} />
      <h2>New Entry:</h2>
        <Form addName={addName} newName={newName} handleNoteChange={handleNoteChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <PersonsList filtered={filteredPersons}/>
    </div>
  )
}

export default App