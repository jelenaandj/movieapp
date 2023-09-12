import { JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from 'react'
import { ButtonSmallDelete, FormButton, FormButtonSmall, H1Gray, InputButton, Inputs } from '../../allComponents/AllComponents'
import OverviewImg from '../../components/overviewImg/OverviewImg'
import img from '../../assets/img/addnew.png'
import './addNew.scss'
import { v4 as uuidv4 } from 'uuid';
import { fetchUpdatedState } from '../../store/dataSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAddNewMovie, fetchEditMovie } from '../../api/api'

type Props = {
    isEditMode?:boolean,
    movie?:any,
    setIsEditMode?:any
}

const AddNew = (props: Props) => {
const{isEditMode,movie,setIsEditMode}=props
// console.log(movie);

const[newMovie,setNewMovie]=useState({})
const[actors,setActors]=useState([])
const[actorsText,setActorsText]=useState('')
const[genres,setGenres]=useState<any[]>()
const[isFocused,setIsFocused]=useState<boolean>(false)
const[selected,setSelected]=useState<any[]>()
const dispatch = useDispatch()
const navigate = useNavigate()
let allUserData:any = localStorage.getItem('allUserData')
allUserData = JSON.parse(allUserData!)

///
const[titleErr,setTitleErr]=useState(false)
const[yearErr,setYearErr]=useState(false)
const[directorErr,setDirectorErr]=useState(false)
const[descriptionErr,setDescriptionErr]=useState(false)
const[actorsErr,setActorsErr]=useState(false)
const[selectErr,setSelectErr]=useState(false)

useEffect(() => {
  
  let URL = ` http://localhost:3001/genres`;
  fetch(URL).then(data => data.json()).then(data=> setGenres(data));

}, [])
const handleAddNewMovie = async(newMovie: any) =>{
    try {
        const res = !isEditMode? await fetchAddNewMovie(newMovie): await fetchEditMovie(newMovie,movie?._id);
        // dispatch(fetchUpdatedState(newMovie))
    } catch (error) {
    }
}

//puts actor in arr of actors
const actorsClickHandler = () =>{
  if(actorsText ){
  let temp:any = [...actors!]
  temp.push(actorsText)
  setActors(temp)
  };
  setActorsText('')
}


const handleSubmit = async (e: any)=>{
  e.preventDefault()

  let title = e.target['Title'];
  let year = e.target['Year'];
  let director = e.target['Director'];
  let description = e.target['Description'];
  let img = e.target['Image URL'];
  
  if(title !== '' && year !== '' && director !== '' && actors?.length >0 && description !== '' && selected!?.length >0){
    // handleAddNew(newMovie)
    // console.log('added movie',newMovie);
    await handleAddNewMovie({
      description:description.value,
      director:director.value,
      actors:actors,
      genre:selected,
      imgUrl:img.value,
      title:title.value,
      year:year.value,
      favorite: false
    })
    dispatch(fetchUpdatedState({
      description:description.value,
      director:director.value,
      actors:actors,
      genre:selected,
      imgUrl:img.value,
      title:title.value,
      year:year.value,
      favorite: false
    }))
    navigate(`/`)
  }else{
    if(title.value === ''){
      setTitleErr(true)
    }if(year.value === ''){
      setYearErr(true)
    }if(director.value === ''){
      setDirectorErr(true)
    }if(actors.length <1){
      setActorsErr(true)
    }if(description.value === ''){
      setDescriptionErr(true)
    }
    if(selected!?.length < 1 || !selected ){
      setSelectErr(true)
      // console.log(selectErr);
    }
  }
}
const handleCancel=()=>{
  setIsEditMode(false)
  // navigate(`/${movie.title}`)

}
  return (
    <div>
      <div className={!isEditMode? "row" : ''}>
      {/* <div className={ "row" }> */}
        {!isEditMode &&<div className="col col-md-6">
          <H1Gray>Add new</H1Gray>
          <OverviewImg  img={img} />
        </div>}
        <div className={!isEditMode? "col col-md-6" :''}>
        {/* <div className={ "col col-md-6" }> */}
          <form className='form' onSubmit={(e)=>handleSubmit(e)}>
            <Inputs types='text' required labels='Title' txt={movie?.title} err={titleErr} setErr={setTitleErr}/>
            <Inputs types='text' required labels='Year' txt={movie?.year} err={yearErr} setErr={setYearErr}/>
            <Inputs types='text' required labels='Director' txt={movie?.director} err={directorErr} setErr={setDirectorErr}/>
            {/* add actor */}
            <div className='actors-inputs'>
                <Inputs types='text' required txt={actorsText} labels='Actors' err={actorsErr} setErr={setActorsErr} setVal={setActorsText}/>
                <div className="btn-holder">
                <InputButton clickHandler={actorsClickHandler}>Add</InputButton>
            </div>
                
                {
                <div className='actors'>
                  
                  {!(actors.length<1) &&<span>Actors:</span>}
                  {actors.map((el,i)=><span key={uuidv4()}>{i>0 ? ', ' : ' '}{el}</span>)}
                </div>
                }
            </div>
                
            <div >
              <p className='select-star'>*</p>
              {isFocused  ?
                <select 
                  style={{height:'3000%'}}
                  multiple
                  value={selected}
                  onBlur={()=>setIsFocused(false)}
                  onChange={e => {
                  e.preventDefault()
                  setIsFocused(true)
                  const options = [...e.target.selectedOptions];
                  const values = options.map(option => option.value);
                  setSelected(values);
                  setSelectErr(false)
                  }}
                >
                {
                  genres && genres!.map((el:any,i: number)=><option key={uuidv4()} value={el}>{el}</option>)
                }
                </select>
                :
                <>
                  <div className={selectErr ? 'genres-label genres-label--err' :'genres-label'}onClick={()=>setIsFocused(true)}>{selected!?.length>0 ? selected?.map((el,i)=><span key={uuidv4()}>{el}{i<selected.length-1 && ','}</span>):<p>Genres</p> }</div>
                  {selectErr&&<p className= 'err--msg'>This is a mandatory field</p>}
                </>
                }
            </div>
            
            <Inputs types='text' required labels='Description' txt={movie?.description} err={descriptionErr} setErr={setDescriptionErr}/>
            <Inputs types='text' labels='Image URL'txt={movie?.imgUrl}  />
            {!isEditMode ?
            <FormButton>Add movie</FormButton>
            :
            <div className='btn-holder'>
            <ButtonSmallDelete handleClick={handleCancel}>Cancel</ButtonSmallDelete>
            <FormButtonSmall>Edit movie</FormButtonSmall>
            </div>}
          </form>
        </div>
      </div>

    </div>
  )
}

export default AddNew