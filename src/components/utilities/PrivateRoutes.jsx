import React from 'react'
import { Navigate, Outlet, Route , redirect} from 'react-router-dom'
import { useAuth } from '../Contexts/UserContext'

const PrivateRoutes = () => {
    const {currentUser} = useAuth()
  return (
    
        currentUser ? <Outlet/> : <Navigate  to={'/login'}/>
    
  )
}

export default PrivateRoutes