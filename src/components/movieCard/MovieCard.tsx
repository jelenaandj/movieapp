import { Link } from 'react-router-dom'
import './movieCard.scss'
import placeholderImg from '../../assets/img/movie_placeholder.png'
import { ButtonSmall, Star } from '../../allComponents/AllComponents'
type Props = {
    movie:any
}

const MovieCard = (props: Props) => {
    const{favorite,imgUrl,title,_id,createdAt} = props.movie
    let now:any = new Date()

    let date:any = new Date(createdAt) 
    //@ts-ignore
    let dif = (now-date)
    let min:any = Math.round((dif/1000)/60);

    return (
    <div className='col col-md-6 col-xl-3'>
        {/* <img src={imgUrl} alt={title} /> */}
        <div className='star-wrapper'>
          <Star showBckground={true} showStar={favorite} _idMovie={_id}/>
        </div>
        <div className='movie-card' >
          {min<10 && <div className='ribbon ribbon--list'><p className='caption-bold'>new</p></div>}

          <div className="movie-card__img"style={{backgroundImage:`url(${imgUrl ? imgUrl : placeholderImg})`}}>
          <p className='movie-card__title'>{title}</p>
          </div>
          <div className=' movie-card--hovered'>
            <Link to={`/${title}`}>
              <ButtonSmall movie={props.movie}>Click for details</ButtonSmall>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default MovieCard