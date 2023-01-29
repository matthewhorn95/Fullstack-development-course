import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = (person) => {
    if(window.confirm(`Delete ${person}?`)) {
        console.log(person)
        getAll()
            .then(data => axios.delete(`${baseUrl}/${data.find(p => p.name === person).id}`))
        console.log('delete success')
        const all = getAll()
        console.log(`all: ${all}`)
        return all
    }
    else {
        console.log('delete cancelled')
        return getAll()
    }
}

export default { getAll, createPerson, remove }