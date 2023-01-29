import Person from './Person.js'

const PersonsList = ( {filtered, remove} ) => {
    return (
        <div>
            <ul>
                {filtered.map(person => <Person key={person.name} person={person.name} number={person.number} remove={remove} />)}
            </ul>
      </div>
    )
}

export default PersonsList