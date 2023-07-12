import React, { useContext, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

const authCheck = () => {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user) {navigate("/login")
    }
  },[user])
}

export default authCheck