const Notification = ({ message }) => {

    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    
    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification