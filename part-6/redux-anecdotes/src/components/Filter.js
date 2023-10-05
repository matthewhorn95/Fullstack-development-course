import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const addFilter = (event) => {
        const filter = event.target.value
        dispatch(filterChange(filter))
    }

    return (
        <div>
            filter <input name="filter"
                          type="text"
                          onChange={addFilter}></input>
        </div>
    )
}

export default Filter