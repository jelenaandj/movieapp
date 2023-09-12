import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'

export interface DataState {
  value: any
}

const initialState: DataState = {
  value: {},
}
export const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    fetchCurrent: (state,action) => {
        state.value = action.payload
    //   console.log(state.value);
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchCurrent } = currentSlice.actions

export default currentSlice.reducer

