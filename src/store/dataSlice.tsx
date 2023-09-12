import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchMovies } from '../api/api'
import { useEffect } from 'react'

export interface DataState {
  value: any
}

const initialState: DataState = {
  value: [],
}
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchState: (state,action) => {
      state.value = action.payload
    },
    fetchUpdatedState:(state,action) =>{
      let temp = JSON.parse(JSON.stringify(state.value));
      state.value = [...temp,action.payload]
      
    },
    fetchUpdatedStateDelete:(state,action) =>{
      let temp = JSON.parse(JSON.stringify(state.value));
      state.value = temp.filter((el: { _id: any })=>el._id !== action.payload)
    },
    fetchUserFavorites: (state,action) => {
      let temp = JSON.parse(JSON.stringify(state.value));
      // console.log('dispatched',action.payload);
      temp = temp?.forEach((movie:any)=>{
        movie.favorite = false
        action.payload.forEach((movieID: any) => {
          // console.log(movie._id,movieID);
          if(movie._id === movieID){
            movie.favorite = true
            // console.log(movie.favorite,'mov fav');
          }
        });
        state.value = temp
      // console.log('dispatched',state.value);
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchState,fetchUserFavorites,fetchUpdatedState,fetchUpdatedStateDelete } = dataSlice.actions

export default dataSlice.reducer

