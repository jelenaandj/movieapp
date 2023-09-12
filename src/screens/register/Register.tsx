import { useEffect, useState } from 'react'
import { Button, Inputs } from '../../allComponents/AllComponents'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserFavorites } from '../../store/dataSlice'
import { fetchLogin, fetchRegister } from '../../api/api'

type Props = {}

const Register = (props: Props) => {
const [user,setUser]=useState()
const [pass,setPass]=useState()
const navigate = useNavigate()
const dispatch = useDispatch()

const handleRegister = async() =>{
    try {
        const res = await fetchRegister(user,pass).then(data=>data)
        navigate("/register")
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res));
        //    res = JSON.parse(res)
        dispatch(fetchUserFavorites(res?.favorites))
    } catch (error) {
        alert(error)
    }
}

// let currentUser 
let userStorage:any
useEffect(() => {

    userStorage =  window.localStorage.getItem("user")
    userStorage = JSON.parse(userStorage)
    // console.log(userStorage?.favorites,'userStorage');
    userStorage && dispatch(fetchUserFavorites(userStorage?.favorites))
}, [ localStorage.getItem("user")])

const handleLogin = async() =>{
        try {
            const res = await fetchLogin(user,pass).then(data=>data)
            
            // console.log(res,'res');
            localStorage.setItem("allUserData",JSON.stringify(res))
            alert('You have successfully logged in')
            navigate("/")

        } catch (error) {
            console.log('err');
            alert(error)
        }
    }
  return (
    <div>
        <form style={{width:'50%',margin:'0 auto'}} >
            <Inputs types='text' setVal={setUser} labels='email'/>
            <Inputs types='password'setVal={setPass} labels='password'/>
            
           {!localStorage.getItem("user") ?<Button handleBtn={handleRegister}>Register</Button> :
            <Button handleBtn={handleLogin}>Login</Button>}
        </form>
    </div>
  )
}

export default Register