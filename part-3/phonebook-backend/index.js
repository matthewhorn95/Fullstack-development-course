const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

// error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// miscellaneous error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())

// overrides homepage get request below, replaced with frontend react app
app.use(express.static('build'))

// set custom console output with morgan API
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
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// Single person delete request
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204)
    })
    .catch(error => next(error))
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
  }
})

// put request to update number field of existing person
app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// taking error handlers into use
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



