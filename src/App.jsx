import { Routes, Route } from "react-router-dom"
import Home from './components/pages/Home'
import './App.css'
import Ads from "./components/pages/Ads"
import Chats from "./components/pages/Chats"
import Create from "./components/pages/Create"
import Profile from './components/pages/Profile'
import Login from "./components/main/Login"
import Error404 from "./components/main/Error404"
import MobileNav from "./components/header/MobileNav"
import Header from "./components/header/Header"
import Listing from "./components/pages/Listing"
import User from "./components/pages/User"

function App() {
  return (
    <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/chats" element={ <Chats /> } />
      <Route path="/sell" element={<Create />} />
      <Route path="/ads" element={ <Ads /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/listings/:id" element={ <Listing /> } />
      <Route path="/user/:id" element={ <User /> } />
     <Route path="*" element={ <Error404 /> } />
    </Routes>
    <MobileNav />
    
  </div>
  )
}

export default App
