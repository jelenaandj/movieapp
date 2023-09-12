import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import currentSlice from './currentSlice'



export const store = configureStore({
  reducer: {
    data:dataSlice,
    current:currentSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch