const Error = ({ message }) => {
    const errorStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16
    }

    if (message === null) {
        return null
    }

    return (
        <div style={errorStyle}>
          {message}
        </div>
      )
}

export default Error