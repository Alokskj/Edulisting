import React from 'react'
import { Navigate, Outlet, Route , redirect} from 'react-router-dom'
import { useAuth } from '../Contexts/UserContext'
import Spinner from '../header/Spinner'

const PrivateRoutes = () => {
    const {currentUser, isLoading} = useAuth()
  return (
    
       !isLoading ? (currentUser ? <Outlet/> : <Navigate  to={'/login'} replace={true}/>) : <Spinner />
    
  )
}

export default PrivateRoutes