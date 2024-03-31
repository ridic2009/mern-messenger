import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import dialogs from './slices/dialogs'
import messages from './slices/messages'
import user from './slices/user'
import search from './slices/search'

export const store = configureStore({
    reducer: {
        dialogs,
        messages,
        user,
        search
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()