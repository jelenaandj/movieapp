import icon from '../../assets/img/arrow-right.svg';
import "./linkItem.scss";


type Props = {
    title:string,
    icon?:boolean,
}

const LinkItem = (props: Props) => {
  return (
    <>
       <p className='regular' >
            {props.title}
       </p>
       {props.icon && <img srcSet={icon} alt="" />}
    </>
  )
}

export default LinkItem