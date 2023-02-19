const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Homepage get request
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

// Persons list get request
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

// Info page get request
app.get('/info', (request, response) => {
    currDate = new Date()
    console.log(currDate)
    response.send(`<p>Phonebook has info for ${persons.length} people </p> 
                  <p> ${currDate} </p>`)
  })

// Single person get request
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Single person delete request
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
  
})

// Single person post request with error handling for
// no name input, no number input, and duplicate name
app.post('/api/persons', (request, response) => {
  const person = request.body

  match = persons.find(x => x.name === person.name)

  if (!person.name) {
    console.log("name must be defined")
    response.status(400).end()
  } else if (!person.number) {
    console.log("number must be defined")
    response.status(400).end()
  } else if (match != undefined) {
    console.log("This person already exists in the phonebook")
    response.status(400).end()
  } else {
    const rand_id = Math.floor(10000*Math.random())
    person["id"] = rand_id

    persons = persons.concat(person)
    response.json(person)
  }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



