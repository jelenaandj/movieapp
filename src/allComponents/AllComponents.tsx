import { useDispatch } from 'react-redux';
import '../styleConfig/variables.scss';
import './allComponent.scss'
import { fetchCurrent } from '../store/currentSlice';
import  star  from '../assets/img/star.png'
import  emptyStar  from '../assets/img/emptyStar.png'
import '../styleConfig/variables.scss'
import { ChangeEvent, useState } from 'react';
import { fetchUserFavorites } from '../store/dataSlice';
import SearchBar from '../components/searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { fetchStarUpdate } from '../api/api';
import GenrePill from '../components/genrePill/GenrePill';
import MovieCard from '../components/movieCard/MovieCard';

export const H1 = (props: any) => {
    const children = props.children
    return <h1 className='heading-one heading-one--white'>{children}</h1>
}
export const H1Gray = (props: any) => {
    const children = props.children
    return <h1 className='heading-one heading-one--header'>{children}</h1>
}
export const H2 = (props: any) => {
    const children = props.children
    return <h2  className='heading-two'>{children}</h2>
}
export const H3 = (props: any) => {
    const children = props.children
    return <h3  className='heading-three'>{children}</h3>
}
export const H4 = (props: any) => {
    const children = props.children
    return <h4  className='heading-four'>{children}</h4>
}
export const H5 = (props: any) => {
    const children = props.children
    return <h5  className='heading-five'>{children}</h5>
}
export const H6 = (props: any) => {
    const children = props.children
    return <h5  className='heading-five'>{children}</h5>
}
export const Text = (props: any) => {
    const children = props.children
    return <p  className='regular'>{children}</p>
}
export const TextSlim = (props: any) => {
    const children = props.children
    return <p  className='regular regular--small'>{children}</p>
}
export const TextLarge = (props: any) => {
    const children = props.children
    return <p  className='caption-large'>{children}</p>
}
export const TextBold = (props: any) => {
    const children = props.children
    return <p  className='caption-bold'>{children}</p>
}
export const TextSmall = (props: any) => {
    const children = props.children
    return <p  className='small-txt'>{children}</p>
}
export const Button = (props: any) => {
    const children = props.children
    const {handleBtn} = props
    return <button type='button' onClick={handleBtn} className='btn'>{children}</button>
}
export const Btn = (props: any) => {
    const children = props.children
    const {handleBtn} = props

    return <button onClick={handleBtn}  className='btn btn--small'>{children}</button>
}
export const FormButton = (props: any) => {
    const children = props.children
    return <button type='submit' className='btn'>{children}</button>
}
export const FormButtonSmall = (props: any) => {
    const children = props.children
    return <button type='submit' className='btn btn--small'>{children}</button>
}
export const ButtonSmall = (props: any) => {
const dispatch = useDispatch()
    const children = props.children
    return <button onClick={()=>dispatch(fetchCurrent(props.movie))}  className='btn btn--small'>{children}</button>
}
export const ButtonSmallDelete = (props: any) => {
    const children = props.children
    const{handleClick} = props
    return <button onClick={handleClick} type='button' className='btn btn--small btn--small--delete'>{children}</button>
}
export const ButtonSmallEdit = (props: any) => {
    const children = props.children
    const{handleClick} = props
    return <button onClick={handleClick}  className='btn btn--small btn--small--edit'>{children}</button>
}
export const InputButton = (props: any) => {
    const children = props.children
    const {clickHandler} = props
    return <button onClick={clickHandler} type='button'  className='btn btn--small'>{children}</button>
}
export const ButtonLink = (props: any) => {
    const children = props.children
    const {clickHandler} = props
    return <button onClick={clickHandler}  className='regular btn--link'>{children}</button>
}

type StarProp={
    showBckground:boolean,
    showStar:boolean,
    _idMovie?:any
}
export const Star = (props: StarProp) => {
    const {showBckground,showStar,_idMovie} = props
    const [isActive,setIsActive]=useState(showStar)
    let allUserDataStorage:any = window.localStorage.getItem("allUserData")
    const dispatch = useDispatch()
    
    if(allUserDataStorage){
        allUserDataStorage = JSON.parse(allUserDataStorage)
        // console.log(user.token,'favorites');
    }

const handleClick = async() =>{
if(!localStorage.getItem("allUserData"))return alert('please log in')
// console.log(allUserDataStorage.allUserDataStorage.favorites,'hh');
let tempArr=[...allUserDataStorage.user.favorites]
        setIsActive(!isActive)
        if(isActive === false){
            tempArr = [...tempArr,_idMovie]
            // console.log(_idMovie,'id');
        }else if(isActive === true){
            tempArr = tempArr!.filter(el=> {
              return  el !== _idMovie
            })
        }
   
    const res = await fetchStarUpdate(tempArr).then(data=>data)

    dispatch(fetchUserFavorites(tempArr))

    //set local storage
    allUserDataStorage.user.favorites = tempArr
    localStorage.setItem("allUserData",JSON.stringify(allUserDataStorage))
}
 return (
    <div onClick={handleClick} className={showBckground===true ? 'star star--bckground' : 'star'} >
        {isActive? <img src={star} alt="" /> :
        <img src={emptyStar} alt="" />}
    </div>)
}



type InputsProp={
    required?:boolean,
    types:string,
    labels:string,
    setVal?:any,
    txt?:any,
    setErr?:any,
    err?:boolean
}
export const Inputs = (props: InputsProp) => {
    const {types,labels,setVal,txt,required,setErr,err} = props
    const [isActive,setIsActive]=useState(false)
    const [text,setText]=useState('')


const handleInputChange=(e: ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(e.target.value !== undefined){
        setText(e.target.value)
        if(setVal){

            setVal((e.target.value))
        }
    }
}
const handleBlur=(e:any)=>{
text === '' ? setIsActive(false) : setIsActive(true)
}
const handleFocus=(e:any)=>{
    setIsActive(true)
    err && setErr(false)
}
    return (
        <div className='inputs-container' onFocus={(e)=>handleFocus(e)} onBlur={(e)=>handleBlur(e)}>
           <p className={required ? 'err err--star' : 'noerr--star' }>*</p>
            <div className={!err? 'inputs' : 'inputs inputs--error'}>
            
                {!txt &&<label className={(isActive) ? 'inputs__label inputs__label--active' : 'inputs__label'} >{labels}</label>}
                <input name={labels}  type={`${types}`} defaultValue={txt} onChange={(e)=>handleInputChange(e)} />
            </div>
            {err&&<p className= 'err--msg'>This is a mandatory field</p>}
            {/* <p className='err'>This is a mandatory field</p> */}
        </div>)
}

const AllComponents = () => {
  return (
    <div>
        <section>
            <H1>Typography</H1>
            <H1>Text</H1>
            <H1Gray>Text</H1Gray>
            <H2>Text</H2>
            <H3>Text</H3>
            <H4>Text</H4>
            <H5>Text</H5>
            <H6>Text</H6>
            <TextLarge>Text</TextLarge>
            <Text>Text</Text>
            <TextSmall>Text</TextSmall>
            <TextSlim>Text</TextSlim>
        </section>
        <section style={{margin:'0px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <H1>Buttons</H1>
            <Button>Button</Button>
            <br/>
            <ButtonLink>Button</ButtonLink>
            <br />
            <ButtonSmallEdit>Button</ButtonSmallEdit>
            <br/>
            <ButtonSmall>Button</ButtonSmall>
            <br />
            <ButtonSmallDelete>Button</ButtonSmallDelete>
        </section>
        <section>
            <H1>Additional</H1>
            <Inputs  types='text' labels='text' />
            <SearchBar setSearchedValue={undefined}/>
            <Star showBckground={true} showStar={false}></Star>
            <Star showBckground={false} showStar={true}></Star>
            <GenrePill genre={'genre'} setGenres={undefined}/>
            <MovieCard movie={{favorite:'true',imgUrl:undefined,title:'Movie Card',_id:'678',createdAt:new Date()}}/>
        </section>
    </div>
  )
}

export default AllComponents