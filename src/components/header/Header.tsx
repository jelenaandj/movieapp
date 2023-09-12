import { Link,NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import LinkItem from '../linkItem/LinkItem'
import "./header.scss";
import { useEffect, useState } from 'react';

type Props = {}

const Header = (props: Props) => {
const[val,setVal]=useState()
const[allUserVal,setAllUserVal]=useState('')
const navigate = useNavigate()
useEffect(() => {
  let userStorage:any = window.localStorage.getItem("user")
  userStorage = JSON.parse(userStorage)
  setVal(userStorage)
  
}, [window.localStorage.getItem("user")])
let allUserDataStorage:any = window.localStorage.getItem("allUserData")
allUserDataStorage = JSON.parse(allUserDataStorage)
// console.log(allUserDataStorage.user.favorites);


useEffect(() => {
  let userStorage:any = window.localStorage.getItem("allUserData")
  userStorage = JSON.parse(userStorage)
  setAllUserVal(userStorage)
  
}, [window.localStorage.getItem("allUserData")])


const handleLogOut=()=>{
window.localStorage.removeItem('allUserData')
setAllUserVal('')
alert("you have successfully logged out")
navigate('/')
}

  return (
    <div>
      <div className='header'>
        <img src={logo} alt="" />
        <div className='nav'>
          <NavLink  style={({ isActive }) => ({ color: isActive ? "rgba(71, 94, 244, 1)" : "" })} to='/all-components'>
            <LinkItem title='All Components' />
          </NavLink>
          <Link to='/'>
            <LinkItem title='All Movies' />
          </Link>
        {allUserDataStorage?.token && <NavLink style={({ isActive }) => ({ color: isActive ? "rgba(71, 94, 244, 1)" : "" })}  to='/favorites'>
            <LinkItem title='All Favorites' />
          </NavLink>}

          {allUserDataStorage?.token === undefined &&
          (
            val? 
            <NavLink style={({ isActive }) => ({ color: isActive ? "rgba(71, 94, 244, 1)" : "" })}  to='/register'>
            <LinkItem title='Login' />
            </NavLink>
            :
            <NavLink style={({ isActive }) => ({ color: isActive ? "rgba(71, 94, 244, 1)" : "" })}  to='/register'>
            <LinkItem title='Register' />
            </NavLink>)
            
          }
          
          {allUserDataStorage?.token  && 
          <NavLink style={({ isActive }) => ({ color: isActive ? "rgba(71, 94, 244, 1)" : "",textDecoration:'none' })}  to='/add'>
            <LinkItem title='Add new movie' icon={true}/>
          </NavLink>}
          
          {allUserDataStorage?.token  && <button className='logout regular'  onClick={handleLogOut}>Log out </button>}
        </div>
      </div>
    </div>
  )
}

export default Header