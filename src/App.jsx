import { Routes, Route, useParams, useLocation } from "react-router-dom"
import Home from './components/pages/Home'
import './App.css'
import Ads from "./components/pages/Ads"
import Chat from "./components/pages/Chat"
import Create from "./components/pages/Create"
import Profile from './components/pages/Profile'
import Login from "./components/main/Login"
import Error404 from "./components/main/Error404"
import MobileNav from "./components/header/MobileNav"
import Header from "./components/header/Header"
import Listing from "./components/pages/Listing"
import User from "./components/pages/User"
import { useEffect } from "react"
import Footer from "./components/footer/Footer"
import AllChats from "./components/pages/AllChats"
import Query from "./components/pages/Query"
import { ContactUs } from "./components/pages/ContactUs"

function App() {
  const {pathname} = useLocation()
  const chatPath = pathname.slice(5,pathname.length)
  return (
    <div className="App">
      
    <Header />
    
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/allchats" element={ <AllChats /> } />
      <Route path="/chat/:id" element={ <Chat /> } />
      <Route path="/query/:id" element={ <Query /> } />
      <Route path="/sell" element={<Create />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/ads" element={ <Ads /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/listings/:id" element={ <Listing /> } />
      <Route path="/user/:id" element={ <User /> } />
     <Route path="*" element={ <Error404 /> } />
    </Routes>
    {pathname !== "/chat" + chatPath  && <MobileNav />} 
    
    
    
  </div>
  )
}

export default App
