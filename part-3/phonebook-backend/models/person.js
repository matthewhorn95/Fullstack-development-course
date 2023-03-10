// database instantiation with mongoose API
//

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// customer number validator
const numberValidator = (val) => {
  return (/^[0-9]{2,3}-([0-9]+)$/gm.test(val))
}

// phonebook person entry schema; id automaticallly generated
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: numberValidator
  }
})

// reformats api/persons output
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)