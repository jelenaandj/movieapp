import { useRef, useState } from 'react';
import './genrePill.scss'
import { useDispatch } from 'react-redux';

type Props = {
    genre:string
    setGenres?:any
    // genres:any
}

const GenrePill = (props: Props) => {
const dispatch=useDispatch();
const{genre,setGenres} = props;
const[isActive,setIsActive] = useState(false)

const handleClick = (e: any) => {
  setIsActive(!isActive)
  if(isActive === false){

    // console.log('uso',e.target.parentElement,genre);
    setGenres((prev: any)=>{
      // console.log(prev,genre);
      return [...prev,genre]
    })
    // setGenres(genre)
  }else{
    setGenres((prev:any)=>{
      return prev.filter((el: string)=> el !== genre)
    })
  }
}
  return (
    //@ts-ignore
    <div className={ isActive ? 'pill pill--active' : 'pill'} onClick={(e)=>handleClick(e)} >
       <p className='regular'>
            {genre}
       </p>
    </div>
  )
}

export default GenrePill