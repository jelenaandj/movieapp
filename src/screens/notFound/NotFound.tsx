import React from 'react'
import notFound from '../../assets/img/404.svg'
import "./notFound.scss";
import { Btn, H1, TextSlim } from '../../allComponents/AllComponents';
import { useNavigate } from 'react-router-dom';



type Props = {}

const NotFound = (props: Props) => {
    const navigate = useNavigate()
    const handleBtn=()=>{
      navigate('/')
    }
  return (
    <div className='notFound'>
      <img src={notFound} alt="not found" />
      <div className='txt'>
        <H1>Lost your way?</H1>
        <TextSlim>Oops! This is awkward. You are looking for something that doesn't actually exist.</TextSlim>
      </div>
      <Btn handleBtn={handleBtn}>Go Home</Btn>
    </div>
  )
}

export default NotFound