import { useSelector } from "react-redux"

const Notification = () => {
  const notifications = useSelector((state) => {
    return state.notifications
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      { notifications.map(n => <div key={n.id}>{n.text}</div>) }
    </div>
  )
}

export default Notification