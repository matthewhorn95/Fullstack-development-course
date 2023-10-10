import { createContext, useReducer, useContext } from 'react'

const generateId = () => {
    const timestamp = new Date().getTime()
    const random = Math.floor(Math.random() * 10000)
    const uniqueId = `${timestamp}${random}`
    return uniqueId
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const currId = generateId()
            const payload = action.payload
            return [...state, { text: payload, id: currId }]
        case "REMOVE":
            return state.slice(1)
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notifications, notificationsDispatch] = useReducer(notificationReducer, [])

    return (
        <NotificationContext.Provider value={[notifications, notificationsDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext