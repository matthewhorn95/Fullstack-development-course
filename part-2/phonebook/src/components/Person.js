import axios from 'axios'
import personService from '../services/personService.js'

const baseUrl = 'http://localhost:3001/persons'

/*const remove = (person) => {
    if(window.confirm(`Delete ${person}?`)) {
        console.log(person)
        personService
            .getAll()
            .then(data => axios.delete(`${baseUrl}/${data.find(p => p.name === person).id}`))
        console.log('delete success')
    }
    else {
        console.log('delete failure')
    }
}*/

// Need to find a way to rerender after calling personService
const Person = ({person, number, remove}) => {
    return (
        <div>
            {person} {number} <button  onClick={() => remove(person)}>delete</button>
        </div>
    )
}

export default Person