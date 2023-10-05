import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const filterStyle = {
        marginBottom: 10
      }

    const dispatch = useDispatch()

    const addFilter = (event) => {
        const filter = event.target.value
        dispatch(filterChange(filter))
    }

    return (
        <div>
            filter <input name="filter"
                          type="text"
                          style={filterStyle}
                          onChange={addFilter}></input>
        </div>
    )
}

export default Filter