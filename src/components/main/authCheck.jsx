import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom';

const authCheck = () => {
  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user) {navigate("/login")
    }
  },[user])
}

export default authCheck