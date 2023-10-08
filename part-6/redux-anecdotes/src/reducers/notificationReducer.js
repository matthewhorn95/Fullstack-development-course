import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const generateId = () => {
    const timestamp = new Date().getTime()
    const random = Math.floor(Math.random() * 10000)
    const uniqueId = `${timestamp}${random}`
    return uniqueId
}

const notificationSlice = createSlice ({
    name: 'notification',
    initialState,
    reducers: {
        enqueueNotification(state, action) {
            const text = action.payload
            const id = generateId()
            state.push({ text, id })
        },
        dequeueNotification(state, action) {
            state.shift()
        }
    }
})

export const { enqueueNotification, dequeueNotification } = notificationSlice.actions
export default notificationSlice.reducer