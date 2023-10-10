import { useNotificationValue} from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notifications = useNotificationValue()

  return (
    <div style={style}>
      {notifications.map(n => <div>{n}</div>)}
    </div>
  )
}

export default Notification
