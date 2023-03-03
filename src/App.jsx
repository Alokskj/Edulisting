import { Routes, Route } from "react-router-dom"
import Home from './components/pages/Home'

import './App.css'
import Ads from "./components/pages/Ads"
import Chats from "./components/pages/Chats"
import Create from "./components/pages/Create"
import Profile from './components/pages/Profile'
import Register from "./components/main/register"
import Login from "./components/main/Login"
import Error404 from "./components/main/Error404"
import { useState } from "react"
import MobileNav from "./components/header/MobileNav"
import Listing from "./components/main/listing"
function App() {
  
  const [isRegister, setRegister] = useState(false)
  
  return (
    <div className="App">
   
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/chats" element={ <Chats /> } />
      <Route path="/sell" element={ isRegister === true ?  <Create /> : <Register /> } />
      <Route path="/ads" element={ <Ads /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/listing" element={ <Listing /> } />
     <Route path="*" element={ <Error404 /> } />
    </Routes>
    
  </div>
  )
}

export default App
