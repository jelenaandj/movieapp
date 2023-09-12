import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MovieType } from '../../types/movieType'
import { RootState } from '../../store'
import './overview.scss'
import { H3, TextSmall } from '../../allComponents/AllComponents'
import OverviewImg from '../../components/overviewImg/OverviewImg'
import placeholder from '../../assets/img/movie_placeholder.png'
import OverviewStoryline from '../../components/overviewStoryline/OverviewStoryline'
import { useNavigate, useParams } from 'react-router-dom';



const Overview = () => {
  let { id } = useParams();
  const navigate = useNavigate()

  let current:MovieType = useSelector((state: RootState) => state.current.value);
  let movies = useSelector((state: RootState) => state.data.value);
  let bckUp

    if(Object.keys(current).length < 1){

      movies = movies.filter((el: { title: string | undefined })=>el.title===id)
      bckUp = movies[0]
      if(bckUp === undefined){
        navigate('/404')
      }
    }

const {genre,title,imgUrl,createdAt} = bckUp ? bckUp : current;
// let date = new Date(createdAt)
// console.log(createdAt,'created',date);
let now:any = new Date()

let date:any = new Date(createdAt) 
//@ts-ignore
let dif = (now-date)
let min:any = Math.round((dif/1000)/60);

// console.log(current,'min' );
  return (
    <div className='overview'>
      {/* <div className='overview-background' style={{ backgroundImage:imgUrl}}> */}
      <div className='overview-background' style={{ backgroundColor: `linear-gradient(180deg, rgba(54, 44, 146, 0.40) 0%, rgba(18, 98, 151, 0.40) 100%),lightgray 50%`, backgroundImage: `url(${imgUrl ? imgUrl : placeholder})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositionY: "center" }}>
      </div>
      <div className='container-fluid'>
        <div className="overview__title">
          <div className='overview__genre' >
            {genre?.map((el: React.Key | null | undefined,i: number)=><div key={el} style={{display:'flex',gap:'16px'}}>{i===0 ? '' : <p>/</p>}<TextSmall>{el}</TextSmall></div>)}
          </div>
          <H3>{title}</H3>
        </div>
        <div className="row">
          <div className='col col-md-6'>
            {min<10 && <div className='ribbon'><p className='caption-bold'>new</p></div>}
            <OverviewImg cover={'cover'} img={imgUrl} />
          </div>
          <div className='col col-md-6'>
            <OverviewStoryline current={bckUp ? bckUp : current}/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Overview