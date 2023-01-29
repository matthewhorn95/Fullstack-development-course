import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonsList from './components/PersonsList.js'
import Form from './components/Form.js'
import personService from './services/personService.js'
import axios from 'axios'

const App = () => {

   // state handling
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

// initializing persons state by fetching json from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, []) 

  const filteredPersons = newFilter.length >= 1
    ? persons.filter(person => person.name.includes(newFilter) || person.number.includes(newFilter))
    : persons

  const addName = (event) => {
    event.preventDefault()
    const temp = { name: newName, number: newNumber}
    if (!containsName(temp.name)) {
      personService
        .createPerson(temp)
        .then(personData => {
          setPersons(persons.concat(personData))
        })
    } else {
      alert(`${newName} is already in the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
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
        <PersonsList filtered={filteredPersons} />
    </div>
  )
}

export default App