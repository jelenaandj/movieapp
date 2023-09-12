import AllMovies from '../screens/allMovies/AllMovies'
import { useSelector, useDispatch } from 'react-redux'
import { fetchState} from '../store/dataSlice'
import type { RootState } from '../store/index'
import { useEffect, useState } from 'react'
import { fetchMovies } from '../api/api'
import Overview from '../screens/overview/Overview'
import NotFound from '../screens/notFound/NotFound'
import { Route, Routes } from 'react-router-dom'
import AddNew from '../screens/addNew/AddNew'
import AllComponents from '../allComponents/AllComponents'
import { fetchCurrent } from '../store/currentSlice'
import Register from '../screens/register/Register'
import AllFavorites from '../screens/allFavorites/AllFavorites'
import './footer.scss'


type Props = {}

const Main = (props: Props) => {

  const dispatch = useDispatch()

  useEffect(() => {

    const getData = async ()=>{

      const data= await fetchMovies().then(data=>data)
      // const data= await fetchUser().then(data=>data)
     
      
      let allUserDataStorage:any = window.localStorage.getItem("allUserData")
      if(!allUserDataStorage) return dispatch(fetchState(data))

      allUserDataStorage = JSON.parse(allUserDataStorage)
      let favs = allUserDataStorage.user.favorites
      let temp = JSON.parse(JSON.stringify(data));

      // console.log(data);

      temp?.forEach((movie:any)=>{
      return  favs?.forEach((fav: any) => {
          if(movie._id === fav){
            movie.favorite = true
          }
        });
      })

      dispatch(fetchState(temp))
      // dispatch(fetchState(data))
    }
    getData()
  }, [window.localStorage.getItem("allUserData")])
  
  return (
    <div className='main'>
        <Routes>
          <Route path='/' element={<AllMovies/>} />
          <Route path='/:id' element={<Overview/>} />
          <Route path='/add' element={localStorage.getItem('allUserData') &&<AddNew/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/favorites' element={localStorage.getItem('allUserData') &&<AllFavorites/>} />
          <Route path='/all-components' element={<AllComponents/>}/>
          <Route path='/404' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default Main