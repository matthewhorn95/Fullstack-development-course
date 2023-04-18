import { useState } from 'react'

const Togglable = (props) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
            <div style={showWhenVisible}>
                {props.children}
            </div>
            <div style={showWhenVisible}>
            <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
  )
}

export default Togglable