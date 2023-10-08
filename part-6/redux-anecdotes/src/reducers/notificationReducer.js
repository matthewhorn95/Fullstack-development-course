import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const notificationSlice = createSlice ({
    name: 'notification',
    initialState,
    reducers: {
        enqueueNotification(state, action) {
            state.push(action.payload)
        },
        dequeueNotification(state, action) {
            state.shift()
        }
    }
})

export const { enqueueNotification, dequeueNotification } = notificationSlice.actions
export default notificationSlice.reducer