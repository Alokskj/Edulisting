import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom';

const authCheck = () => {
  const userinfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userinfo) {navigate("/login")
    return }
  },[])
}

export default authCheck