import Person from './Person.js'

const PersonsList = ( {filtered} ) => {
    return (
        <div>
            <ul>
                {filtered.map(person => <Person key={person.name} person={person.name} number={person.number} />)}
            </ul>
      </div>
    )
}

export default PersonsList