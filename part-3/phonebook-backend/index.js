require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

// overrides homepage get request below, replaced with frontend react app
app.use(express.static('build'))

// set custom console output with morgan
morgan.token("body", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

// imports person model
const Person = require('./models/person.js')

// hard-coded database/server
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
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

// Info page get request
app.get('/info', (request, response) => {
    currDate = new Date()
    console.log(currDate)
    Person.find({}).then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people </p> 
                  <p> ${currDate} </p>`)
    })
  })

// Single person get request
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
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
  const body = request.body

  match = persons.find(x => x.name === body.name)

  if (!body.name) {
    console.log("Name must be defined")
    response.status(400).send({error: "name must be defined"})
  } else if (!body.number) {
    console.log("Number must be defined")
    response.status(400).send({error: "number must be defined"})
  } else if (match != undefined) {
    console.log("This person already exists in the phonebook")
    response.status(400).send({error: "This person already exists in the phonebook"})
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(saved => {
      response.json(saved)
    })

    /*const rand_id = Math.floor(10000*Math.random())
    person["id"] = rand_id

    persons = persons.concat(person)
    response.json(person)*/
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



