// import loop from '../../assets/img/loop.png';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import x from '../../assets/img/x.png';
import  './searchBar.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
  setSearchedValue:any
}

const SearchBar = (props: Props) => {
const {setSearchedValue} = props;
const[isActive,setIsActive] = useState(false);
const[text,setText] = useState('');
// const genres:string[]  = useSelector((state: RootState) => state.data.value)
// console.log(genres,'genres');

const handleInputChange=(e: ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault()
  if(e.target.value !== undefined){
    setText(e.target.value)
    setSearchedValue(e.target.value)
  }
}
const handleDelete=()=>{
  setText('');
  setSearchedValue('')
}

  return (
    <div className='search-bar' onFocus={()=>setIsActive(true)} onBlur={()=>text === '' ? setIsActive(false) : setIsActive(true)} >
      <label htmlFor='search' className={(isActive) ? 'search-bar__label search-bar__label--active' : 'search-bar__label'}>Search Movies</label>
      <input id='search' value={text} onChange={(e)=>handleInputChange(e)} className='search-bar__input' type="text" />
      <button onClick={handleDelete}></button>
    </div>
  )
}

export default SearchBar