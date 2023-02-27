import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonsList from './components/PersonsList.js'
import Form from './components/Form.js'
import Notification from './components/Notification.js'
import personService from './services/personService.js'
import Error from './components/Error.js'

const App = () => {

   // state handling
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

// initializing persons state by fetching json from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

// defines functionality of filter field
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
          setSuccessMessage(`${temp.name} was successfully added to the phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('error from frontend')
          console.log(error.response.data.error)
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
        personService
          .updateNumber(temp)
          .then(personData => {
            const all = personService.getAll()
            setSuccessMessage(`${temp.name}'s number was successfully changed`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            return all
          })
          .then(all => {
            setPersons(all)
          })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if(window.confirm(`Delete ${person}?`)) {
      personService
        .remove(person)
        .then(personData => {
          const all = personService.getAll()
          return all
        })
        .then(all => {
          setPersons(all)
          setSuccessMessage(`${person} was successfully removed from the phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
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
    <>
      <h2>Phonebook</h2>
        <Notification message={successMessage} />
        <Error message={errorMessage} />
        <Filter filter={newFilter} handler={handleFilterChange} />
      <h2>New Entry:</h2>
        <Form addName={addName} newName={newName} handleNoteChange={handleNoteChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <PersonsList filtered={filteredPersons} remove={removePerson} />
    </>
  )
}

export default App