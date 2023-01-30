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
    getAll()
        .then(data => axios.delete(`${baseUrl}/${data.find(p => p.name === person).id}`))
    const all = getAll()
    return all
}

const updateNumber = (person) => {
    if(window.confirm(`${person.name} is already in the phonebook. Replace old number with new one?`)) {
        console.log(person)
        getAll()
            .then(data => axios.put(`${baseUrl}/${data.find(p => p.name === person.name).id}`, { name: person.name, number: person.number}))
        console.log('replace success')
        const all = getAll()
        return all
    }
    else {
        console.log('replace cancelled')
        return getAll()
    }
    
}

export default { getAll, createPerson, remove, updateNumber }