const Filter = ( {filter, handler} ) => {
    return (
        <div>
            Filter entries that include: <input value={filter} onChange={handler} />
        </div>
    )
}

export default Filter
