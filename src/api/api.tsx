let allUserDataStorage:any = localStorage.getItem('allUserData')
allUserDataStorage = JSON.parse(allUserDataStorage)
const URL = `https://movieapp-wnsi.onrender.com/api`

export const fetchMovies = () => {
let URL = `https://movieapp-wnsi.onrender.com/api/movies`;
return  fetch(URL).then(data => data.json());
}
export const fetchRegister= async(user: any,pass: any) => {
        console.log('REGISTER');
        return fetch('https://movieapp-wnsi.onrender.com/api/auth/register',{
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Content-Length": "<calculated when request is sent>",
            "Host": "<calculated when request is sent>",
            "Accept": "*/*",
            "Access-Control-Allow-Origin":"*",
        },

        body:JSON.stringify({
            "email" : user,
            "password":pass
        })
       }).then(data=>data.json())
  
}
export const fetchLogin= async(user: any,pass: any) => {
        console.log('LOGIN');
        return fetch('https://movieapp-wnsi.onrender.com/api/auth/login',{
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Content-Length": "<calculated when request is sent>",
            "Host": "<calculated when request is sent>",
            "Accept": "*/*",
            "Access-Control-Allow-Origin":"*",
        },

        body:JSON.stringify({
            "email" : user,
            "password":pass
        })
       }).then(data=>data.json())
}

export const fetchDelete= async(_id: any) => {
let allUserDataStorage:any = localStorage.getItem('allUserData')
allUserDataStorage = JSON.parse(allUserDataStorage)
        console.log('DELETE');
        return fetch(`https://movieapp-wnsi.onrender.com/api/movies/${_id}`,{
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Content-Length": "<calculated when request is sent>",
            "Host": "<calculated when request is sent>",
            "Accept": "*/*",
            "Access-Control-Allow-Origin":"*",
            "authorization":allUserDataStorage.token

        },
       }).then(data=>data.json())
}
export const fetchStarUpdate= async(tempArr: any[]) => {
        console.log('REGISTER');
        return fetch(`https://movieapp-wnsi.onrender.com/api/users/${allUserDataStorage.user._id}`,{
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            "Content-Length": "<calculated when request is sent>",
            "Host": "<calculated when request is sent>",
            "Accept": "*/*",
            "Access-Control-Allow-Origin":"*",
            "authorization":allUserDataStorage.token
          },
        body:JSON.stringify({
            "favorites":tempArr
        })
       })
  
}
export const fetchAddNewMovie= async(newMovie: object) => {
        console.log('NEW MOVIE');
        return fetch('https://movieapp-wnsi.onrender.com/api/movies',{
          method: 'POST',
          headers: {
              "Content-type": "application/json",
              "Content-Length": "<calculated when request is sent>",
              "Host": "<calculated when request is sent>",
              "Accept": "*/*",
              "Access-Control-Allow-Origin":"*",
              "authorization":allUserDataStorage.token

          },
                
          body:JSON.stringify(
            newMovie
          )
      })
  
}
export const fetchEditMovie = async(newMovie: object,_id: any) => {
        console.log('EDIT MOVIE');
        return fetch(`https://movieapp-wnsi.onrender.com/api/movies/${_id}`,{
          method: 'PUT',
          headers: {
              "Content-type": "application/json",
              "Content-Length": "<calculated when request is sent>",
              "Host": "<calculated when request is sent>",
              "Accept": "*/*",
              "Access-Control-Allow-Origin":"*",
              "authorization":allUserDataStorage.token

          },
                
          body:JSON.stringify(
           newMovie
          )
      })
}

export const fetchGenres = () => {
let URL = ` http://localhost:3001/genres`;
return  fetch(URL).then(data => data.json());
}