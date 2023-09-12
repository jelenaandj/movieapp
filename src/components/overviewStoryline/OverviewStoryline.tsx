import React, { useState } from 'react'
import { ButtonSmallDelete, ButtonSmallEdit, H4, Star, Text, TextBold, TextLarge, TextSlim } from '../../allComponents/AllComponents'
import { v4 as uuidv4 } from 'uuid';
import './overviewStoryline.scss'
import { useDispatch } from 'react-redux';
import { fetchUpdatedStateDelete } from '../../store/dataSlice';
import { useNavigate } from 'react-router-dom';
import { fetchDelete } from '../../api/api';
import AddNew from '../../screens/addNew/AddNew';
type Props = {
    current:any
}

const OverviewStoryline = (props: Props) => {
  const {description,favorite,year,director,actors,genre,_id,title,createdAt}=props.current
  const [isEditMode,setIsEditMode] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let allUserDataStorage:any = localStorage.getItem('allUserData')
  allUserDataStorage = JSON.parse(allUserDataStorage)



  const handleDelete=async()=>{
    let answer = window.confirm(`Are you sure you want to delete movie - ${title}`)
    if(!answer)return
    // console.log(_id);
    navigate('/')
    const res = await fetchDelete(_id)

    dispatch(fetchUpdatedStateDelete(_id))
  }
  const handleEdit=()=>{
    setIsEditMode(true)
  }
  return (
    <>
    {!isEditMode &&<div className='storyLine'>
      <div>
        <div className='paragraph'>
          <H4>Storyline</H4>
          <TextBold>{description}</TextBold>
        </div>
        <div className='paragraph'>
          <TextSlim>Favorite</TextSlim>
          <Star showBckground={false} showStar={favorite} _idMovie={_id} />
        </div>
        <div className='paragraph'>
          <TextSlim>Year of release</TextSlim>
          <TextBold>{year}</TextBold>
        </div>
        <div className='paragraph'>
          <TextSlim>Director</TextSlim>
          <TextBold>{director}</TextBold>
        </div>
        <div className='paragraph'>
          <TextSlim>Actors</TextSlim>
          <div className='list'>
            {
              actors?.map((el: any,i: number)=><TextBold key={uuidv4()}>{el}{i === actors.length-1 ? '' : `,`}</TextBold>)
            }
          </div>
        </div>
        <div className='paragraph'>
          <TextSlim>Genres</TextSlim>
          <div className='list'>
            {
              genre?.map((el: any,i: number)=><TextBold key={uuidv4()}>{el}{i === genre.length-1 ? '' : ','}</TextBold>)
            }
          </div>
        </div>
        <div className="paragraph btn-holder">

        {allUserDataStorage&& <ButtonSmallDelete handleClick={handleDelete}>Delete movie</ButtonSmallDelete>}
        {allUserDataStorage&& <ButtonSmallEdit handleClick={handleEdit}>Edit movie</ButtonSmallEdit>}
        </div>
      </div>
    </div>}
    {isEditMode &&<AddNew isEditMode = {isEditMode} setIsEditMode={setIsEditMode} movie = {props.current} />}
    </>
  )
}

export default OverviewStoryline