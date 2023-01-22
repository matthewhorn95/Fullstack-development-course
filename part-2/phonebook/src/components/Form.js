const Form = ( {addName, newName, handleNoteChange, newNumber, handleNumberChange} ) => {
    return (
        <form onSubmit={addName}>
            <div>
                Name: <input value={newName} onChange={handleNoteChange} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form