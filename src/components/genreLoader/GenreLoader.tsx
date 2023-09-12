import React, { useEffect, useState } from 'react'
import { MovieType } from '../../types/movieType'
import LinkItem from '../linkItem/LinkItem'
import RenderList from '../renderList/RenderList'
import GenrePill from '../genrePill/GenrePill'
import "./genreLoader.scss";
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


// @ts-ignore
const GenreLoader = ({setGenres}) => {

const movies:MovieType[] = useSelector((state: RootState) => state.data.value)

// console.log(movies,'new')
let genre: string[]=[]
let res: string[]=[]
// useEffect(() => {
  
  movies?.filter((element:any) => {
    if(genre && element.genre)

    return genre = [...genre, ...element?.genre];
  });
  
  genre?.forEach((element: string) => {
    if (!res.includes(element)) {
      res.push(element);
    }
  });
// }, [])


  return (
   <div className='genre-loader'>
      <RenderList items={res} setGenres={setGenres} resourceName='genre' itemComponent={GenrePill}/>
    </div>
  )
}

export default GenreLoader