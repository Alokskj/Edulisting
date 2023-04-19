import { Routes, Route, useParams, useLocation, Link, Outlet } from "react-router-dom"
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
import { useEffect, useState } from "react"
import Footer from "./components/footer/Footer"
import AllChats from "./components/pages/AllChats"
import Query from "./components/pages/Query"
import { ContactUs } from "./components/pages/ContactUs"
import Notification from "./components/pages/Notification"
import EditProfile from "./components/pages/EditProfile"
import SimpleBottomNavigation from "./components/header/SimpleBottomNavigation"
import Setting from "./components/pages/Setting"
import Support from "./components/pages/Support"

import PageHeader from "./components/header/PageHeader"
import BookCategory from "./components/pages/BookCategory"

function App() {
  const {pathname} = useLocation()
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  let view = true
  const chatPath = pathname.slice(5,pathname.length);
  useEffect(() => {

 
   if(window.innerWidth < 640){   
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e) => {
      // prevent the right-click menu from appearing
      e.preventDefault()
    }

    // attach the event listener to 
    // the document object
    document.addEventListener("contextmenu", handleContextMenu)

    // clean up the event listener when 
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }
  }, [])

  if(pathname === "/editprofile" || pathname === ("/chat"+ chatPath) || pathname === ("/user"+ chatPath) || pathname === "/setting" || pathname === "/help-and-support"){
    view = false
  }
  else{
    view = true
  };
  return (
    <>
    <div className={window.innerWidth < 840 ? "text-select-disable" : " "}>
      {/* {view && <Header />}  */}
    
    <Routes>
      

      <Route element={<> <Header /> <Outlet /> <SimpleBottomNavigation /></>}>
      <Route path="/" element={ <Home/> } />
      <Route path="/allchats" element={ <AllChats /> } />
      <Route path="/query/:id" element={ <Query /> } />
      <Route path="/notification" element={<Notification />} />
      <Route path="/ads" element={ <Ads /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="*" element={ <Error404 /> } />
      <Route path="/listings/:id" element={ <Listing /> } />
      </Route>


      <Route element={<><Outlet/> <SimpleBottomNavigation /></>}>
      <Route path="/user/:id" element={ <User /> } />
      </Route >


      <Route path="/sell" >  
      <Route index element={<Create />} />
      <Route path="category" element={ <BookCategory /> } />
      </Route>


      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/chat/:id" element={ <Chat /> } />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/help-and-support" element={ <Support /> } />
      <Route path="/setting" element={ <Setting /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/edulisting.apk" element={ <Link to="/edulisting.apk"></Link> } />
    </Routes>
   
    
    
    </div>
   </>
  )
}

export default App
