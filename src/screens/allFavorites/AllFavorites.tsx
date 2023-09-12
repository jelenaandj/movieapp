import React, { useEffect, useState } from 'react'
import RenderList from '../../components/renderList/RenderList'
import MovieCard from '../../components/movieCard/MovieCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ButtonLink } from '../../allComponents/AllComponents'

type Props = {}

const AllFavorites = (props: Props) => {
const movies:any[]  = useSelector((state: RootState) => state.data.value)
let width = window.innerWidth

const [count,setCount]=useState<number>(width<800 ? 6 : 8);
const [increment,setIncrement]=useState<number>(count);

const[listOfFav,setListOfFav]=useState<any>()
// console.log(localStorage.getItem("allUserData"));

useEffect(() => {
  let newArr: any[]=[]
  // console.log(newArr,'new arr');
  let temp = [...movies]
    // console.log('rerendered');
  temp.forEach(movie=>{
    if(movie.favorite === true){
      // console.log(movie.title,'title');
        newArr.push(movie)
    }
  })
  // console.log(newArr,'new arr after');

  setListOfFav(newArr)
}, [movies])
// console.log(listOfFav,'newarr');


//sets slice count for movie list
  const setShowMore = (count: number) =>{
    if(count > movies.length){
      return setCount(movies.length)
    }else{
      return setCount(count += increment || count)
    }
  }

//checks window size
  useEffect(() => {
    window.addEventListener('resize', (e:any)=>{
      let width = window.innerWidth
      if(width < 800){
        // setCount(6)
        setIncrement(6)
      }else if(width > 800){
        // setCount(8)
        setIncrement(8)
      }
    });
    
  }, [width]);
  return (
    <div>
        <RenderList items={listOfFav?.slice(0,count)} resourceName='movie' classTxt='row' itemComponent={MovieCard}/>
        <ButtonLink clickHandler={()=>setShowMore(count)} >Show more</ButtonLink>

    </div>
  )
}

export default AllFavorites