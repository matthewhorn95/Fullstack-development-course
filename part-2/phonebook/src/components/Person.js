const Person = ({person, number, remove}) => {
    return (
        <div>
            {person} {number} <button  onClick={() => remove(person)}>delete</button>
        </div>
    )
}

export default Person