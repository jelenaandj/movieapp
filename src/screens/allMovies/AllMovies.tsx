import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import GenreLoader from '../../components/genreLoader/GenreLoader'
import MovieCard from '../../components/movieCard/MovieCard'
import RenderList from '../../components/renderList/RenderList'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ButtonLink, H1,H3,Text } from '../../allComponents/AllComponents'


type Props = {}

const AllMovies = (props: Props) => {
const[movies,setMovie]=useState<any>()
let moviesData:any[]  = useSelector((state: RootState) => state.data.value)


let width = window.innerWidth
const [searchedValue,setSearchedValue]=useState('');
const [genres,setGenres]=useState([]);
const [count,setCount]=useState<number>(width<800 ? 6 : 8);
const [increment,setIncrement]=useState<number>(count);


let searchResult = movies?.filter((el: { title: string })=>el.title?.toLowerCase().includes(searchedValue))
//@ts-ignore
let pillResult = searchResult?.filter(el=>{
  const item = el.genre
  const itemArr= genres.some(elGenre=>item.includes(elGenre))
  return itemArr
})
useEffect(() => {
  setMovie(moviesData)
}, [localStorage.getItem('allUserData'),moviesData])

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
        setIncrement(6)
      }else if(width > 800){
        setIncrement(8)
      }
    });
    
  }, [width]);
// console.log(movies);
return (
    <div>
        <H1>All Movies</H1>
        <Text>List of all movies I have watched till date.</Text>
        <SearchBar setSearchedValue={setSearchedValue}/>
        <GenreLoader setGenres={setGenres}/>
        <div className='caption--gray' style={{display:'flex',alignItems:'baseline',gap:'5px'}}>
          <H3>All</H3>
          <Text>({movies?.length})</Text>
        </div>
        <RenderList items={(genres?.length ? pillResult : searchResult)?.slice(0,count)} resourceName='movie' classTxt='row'  itemComponent={MovieCard} />

        <ButtonLink clickHandler={()=>setShowMore(count)} >Show more</ButtonLink>
       
    </div>
  )
}

export default AllMovies