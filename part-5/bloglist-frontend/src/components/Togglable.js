import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
            <div className='toggleable' style={showWhenVisible}>
                {props.children}
            </div>
            <div style={showWhenVisible}>
            <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
  )
}

export default Togglable