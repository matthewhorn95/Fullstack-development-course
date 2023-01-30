import axios from 'axios'
import personService from '../services/personService.js'

const baseUrl = 'http://localhost:3001/persons'

const Person = ({person, number, remove}) => {
    return (
        <div>
            {person} {number} <button  onClick={() => remove(person)}>delete</button>
        </div>
    )
}

export default Person