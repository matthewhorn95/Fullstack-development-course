const mongoose = require('mongoose')

const args = process.argv

if (args.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const pass = args[2]
const url = `mongodb+srv://matthewhorn1995:${pass}@phonebook-cluster.s2htsqt.mongodb.net/phonebook3?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (args.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (args.length === 5) {
    const person = new Person({
        name: args[3],
        number: args[4]
    })
    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
} else {
    console.log('malformed args; try inputting name in quotes and number (two items total following password)')
    mongoose.connection.close()
}









