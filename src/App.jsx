import { Routes, Route } from "react-router-dom"
import Home from './components/pages/Home'

import './App.css'
import Ads from "./components/pages/Ads"
import Chats from "./components/pages/Chats"
import Create from "./components/pages/Create"
import Profile from './components/pages/Profile'
function App() {
  

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/chats" element={ <Chats /> } />
      <Route path="/sell" element={ <Create /> } />
      <Route path="/ads" element={ <Ads /> } />
      <Route path="/profile" element={ <Profile /> } />
    </Routes>
  </div>
  )
}

export default App
