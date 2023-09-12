import './overviewImg.scss'
import placeholder from '../../assets/img/movie_placeholder.png'

type Props = {
    img:string,
    cover?:any,
}

const OverviewImg = (props: Props) => {
    const{img,cover}=props
  return (
    <div className='ov-img' style={{backgroundImage:`url(${img ? img : placeholder})`,backgroundSize:`${cover}`}} ></div>
  )
}

export default OverviewImg